import React from 'react';
import Promise from "bluebird"
import { StackActions } from '@react-navigation/native';
import lightwallet from "../../vendor/lightwallet.min.js"
const bip39 = require('../../vendor/bip39.browser.js')

import { getItem, setItem, rmItem } from "../../utils/storage"
import { ASYNC_STORAGE_KEY, CREATE, RESTORE } from '../../constants';
import PassphrasePresentation from './presentation';

const createVaultProm = Promise.promisify(lightwallet.keystore.createVault.bind(lightwallet.keystore))
const keyFromPassword = Promise.promisify(lightwallet.keystore.prototype.keyFromPassword);

class Passphrase extends React.PureComponent {
  static goHome(serializedKeystore, pwDerivedKey, navigation) {
    // TODO: serialize data passed via navigator, i.e. serialize(pwDerivedKey)
    navigation.dispatch(
      StackActions.replace('Home', { serializedKeystore, pwDerivedKey })
    )
  }

  state = {
    mode: null,
    passphrase: "",
    isPassIncorrect: null
  }

  create = async (pass) => {
    try {
      const ks = await createVaultProm({
        password: pass,
        seedPhrase:  bip39.generateMnemonic(),
        hdPathString: "m/0'/0'/0'"
      })

      try {
        const pwDerivedKey = await keyFromPassword.call(ks, pass)
        ks.generateNewAddress(pwDerivedKey)

        const serializedKeystore = ks.serialize();
        await setItem(ASYNC_STORAGE_KEY, serializedKeystore)

        Passphrase.goHome(serializedKeystore, pwDerivedKey, this.props.navigation)
      } catch (err) {
        console.log("Failed to derive key");
        throw err
      }
    } catch (err) {
      console.log('Failed to create vault.', err);
      throw err;
    }
  }

  restore = async (pass) => {
    let serializedKeystore

    try {
      serializedKeystore = await getItem(ASYNC_STORAGE_KEY);
    } catch (err) {
      console.log('Failed to get item from async storage.', err);
      throw err
    }

    const ks = lightwallet.keystore.deserialize(serializedKeystore)
    try {
      const pwDerivedKey = await keyFromPassword.call(ks, pass)
      const isCorrect = ks.isDerivedKeyCorrect(pwDerivedKey)

      if (isCorrect) {
        this.setState({
          isPassIncorrect: false
        }, () => {
          Passphrase.goHome(serializedKeystore, pwDerivedKey, this.props.navigation)
        })
      } else {
        this.setState({ isPassIncorrect: true })
      }
    } catch (err) {
      console.log('Failed to derive key');
      throw err
    }
  }

  reset = async () => {
    try {
      await rmItem(ASYNC_STORAGE_KEY)
      this.setState({
        mode: CREATE,
        passphrase: "",
        isPassIncorrect: null
      })
      // this.props.navigation.dispatch(StackActions.replace('Passphrase'))
    } catch (e) {
      throw e
    }
  }

  handleChange= (text) => {
    this.setState({passphrase: text})
  }

  async componentDidMount() {
    const keystore = await getItem(ASYNC_STORAGE_KEY)

    null === keystore ?
      this.setState({ mode: CREATE }) :
      this.setState({ mode: RESTORE })
  }

  render() {
    const btnDisabled = !this.state.passphrase.length

    return <PassphrasePresentation
            mode={this.state.mode} handleChange={this.handleChange}
            passphrase={this.state.passphrase} isPassIncorrect={this.state.isPassIncorrect}
            create={this.create} restore={this.restore} btnDisabled={btnDisabled}
            reset={this.reset}
            />
  }
}

export default Passphrase
