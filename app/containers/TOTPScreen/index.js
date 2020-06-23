import React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import Title from '../../components/UI/Title';
import Logo from '../../assets/logo.png';

const TOTPCode = ({ code }) => {
  return <Text style={styles.code}>{code}</Text>
} 

export default TOTPScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Image style={styles.logo} source={Logo} />
        <Title>Twitter Account</Title>
        <Text>Twitter | info@cerby.com</Text>
      </View>
      <View style={{flex: 1}}>
        <TOTPCode code='865237' /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  containerTop: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 15,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  code: {
    fontSize: 46,
    fontFamily: 'sans-serif-medium',
    fontWeight: '900',
    color: '#178bfe',
  }
});

