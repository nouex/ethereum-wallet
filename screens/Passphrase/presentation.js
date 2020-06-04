import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Button, Input, Text } from 'react-native-elements';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { ASYNC_STORAGE_KEY, CREATE, RESTORE } from '../../constants';

// TODO: add button to regenerate in case password is forgotten
const PassphrasePresentation = (props) => {
  const {
    mode, handleChange, passphrase, isPassIncorrect, create, restore,
    btnDisabled, reset
  } = props

  if (mode === null) return <Text>"Loading..."</Text>

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>
        {
          mode === CREATE ? "Welcome!" : "Welcome back!"
        }
      </Text>
      <Text style={styles.descText}>
        {
          mode === CREATE ? "Create a good passphrase to begin." : "Type your passphrase to continue."
        }
      </Text>
      <Input
        placeholder="abc123"
        leftIcon={{ type: "font-awesome", name: "lock"}}
        onChangeText={handleChange}
        autoCapitalize="none"
       />
      {
        isPassIncorrect === null ?
        null
        : isPassIncorrect === true
            ? <Text style={styles.errorText}>Incorrect, please try again.</Text>
            : <Text>Correct :)</Text>
      }
      <Button
        buttonStyle={styles.button}
        disabled={btnDisabled}
        title={mode === CREATE ? "Generate Key Pair" : "View Account"}
        onPress={
          mode === CREATE ?
            create.bind(this, passphrase) :
            restore.bind(this, passphrase)
        }
      />
      {
        mode === RESTORE ?
          (
            <>
              <Text style={styles.forgotText}>Forgot passphrase? </Text>
              <Button
                buttonStyle={styles.button}
                title={"Generate a new key pair"}
                onPress={reset}
              />
            </>
          ) :
          null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
  title: {
    color: Colors.dark
  },
  descText: {
    marginTop: 10,
    color: Colors.dark
  },
  button: {
    marginTop: 50,
    width: "66%",
    marginRight: "auto",
    marginLeft: "auto"
  },
  forgotText: {
    marginTop: 50,
    fontSize: 24,
    color: Colors.dark
  },
  errorText: {
    color: "red"
  }
});

export default PassphrasePresentation
