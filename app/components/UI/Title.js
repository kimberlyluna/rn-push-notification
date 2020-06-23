import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default Title = ({ children }) => {
  return <Text style={styles.base}>{children}</Text>
};

const styles = StyleSheet.create({
  base: {
    fontSize: 18,
    fontWeight: '900',
  }
});

