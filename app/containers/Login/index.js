import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text
} from 'react-native';

import Logo from '../../assets/logo.png';

import { signIn } from '@okta/okta-react-native';

export default Login = () => {
  return (
    <View style={styles.body}>
      <Image source={Logo} />
      <View style={styles.buttonsContainer}>
        <Button title="Login" onPress={async () => signIn()} />
        <Button title="Sign In" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    marginHorizontal: 20,
    marginVertical: 100,
    flex: 1,
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 80,
    justifyContent: 'space-between',
    height: 120,
  }
});