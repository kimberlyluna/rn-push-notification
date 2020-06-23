import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import Title from './Title';
import Logo from '../../assets/logo.png';

export default Card = ({title, subtitle, imageSource = Logo}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Title>{title}</Title>
        <Text>{subtitle}</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  }
})



