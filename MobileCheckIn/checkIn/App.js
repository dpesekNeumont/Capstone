import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from './src/components/login'
import Home from './src/components/home'
import Confirmation from './src/components/confirmation'
import CheckIn from './src/components/checkIn'
import Preview from './src/components/preview'
import Error from './src/components/error'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  CheckIn: {
    screen: CheckIn
  },
  Preview: {
    screen: Preview
  },
  Confirmation: {
    screen: Confirmation
  },
  Error: {
    screen: Error
  }
})

const Display = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Display />
  );
}