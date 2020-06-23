import React from 'react';

import {
  View,
  Button,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import Card from '../../components/UI/Card';
import Title from '../../components/UI/Title';
import Logo from '../../assets/logo.png';

export default Confirmation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} />
        <Title>Login Request</Title>
        <Text>To continue confirm your Identity</Text>
      </View>
      <View style={styles.cardsContainer}>
        <Card title="Twitter Account" subtitle="Twitter | info@cerby.com"/>
        <Card title="Andy Simone" subtitle="andy@cerby.com"/>
        <Card title="13:00 pm" subtitle="June 25, 2020"/>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Deny" onPress={() => navigation.goBack()}/>
        <Button title="Approve" onPress={() => navigation.navigate('TOTPScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    paddingVertical: 60,
  },
  logoContainer: {
    flex: 40,
    alignItems: 'center'
  },
  cardsContainer: {
    flex: 50,
    justifyContent: 'flex-start',
    paddingVertical: 15
  },
  buttonsContainer: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {
    height: 140,
    width: 140,
  }
})