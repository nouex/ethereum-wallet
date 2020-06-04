import React from 'react';

import lightwallet from "../../vendor/lightwallet.min.js"
import { StackActions } from '@react-navigation/native';

import { rmItem } from "../../utils/storage"
import { ASYNC_STORAGE_KEY } from '../../constants';
import Presentation from "./presentation"

const onPress = async ({ navigation }) => {
  try {
    await rmItem(ASYNC_STORAGE_KEY)
    navigation.dispatch(StackActions.replace('Passphrase'))
  } catch (e) {
    throw e
  }
}

const Home = (props) => {
  const { params: { serializedKeystore, pwDerivedKey } } = props.route

  const ks = lightwallet.keystore.deserialize(serializedKeystore)
  const pubKey = ks.getAddresses()[0]
  const privKey = ks.exportPrivateKey(pubKey, pwDerivedKey)

  return (
    <Presentation
      onPress={onPress.bind(this, props)} pubKey={pubKey} privKey={privKey} />
  )
}

export default Home
