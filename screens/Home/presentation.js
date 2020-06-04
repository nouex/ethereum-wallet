import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';

import { Input, Text, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const HomePresentation = ({ onPress, pubKey, privKey }) => {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.subSectionTitle}>
              Public Address  <Icon name="map-marker" size={22}/>
            </Text>
            <View style={styles.subSectionContainer}>
              <Text style={styles.subSectionDescription}>
                {pubKey}
              </Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subSectionTitle}>
              Private Key  <Icon name="key" size={22}/>
            </Text>
            <Text style={styles.subSectionDescription}>
              {privKey}
            </Text>
          </View>
        </View>
      <Button
        buttonStyle={styles.button}
        title="Re-Generate"
        type="solid"
        onPress={onPress}
      />
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.lighter,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: "600"
  },
  subSectionTitle: {
    fontSize: 24,
    color: Colors.dark,
  },
  subSectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
    color: Colors.dark,
  },
  subSectionContainer: {
    backgroundColor: Colors.lighter
  },
  button: {
    marginTop: 50,
    width: "66%",
    marginRight: "auto",
    marginLeft: "auto"
  }
});

export default HomePresentation
