import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Home from ".//Home"
import Passphrase from './/Passphrase'

const Stack = createStackNavigator()

const Navigator: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Passphrase">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Ethereum Account Keys" }}
          />
        <Stack.Screen
          name="Passphrase"
          component={Passphrase}
          options={{ title: "Enter Passphrase" }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator
