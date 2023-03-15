import React from 'react';
import {StyleSheet, Image} from 'react-native';
import themes from '../themes';
const LogoApp = () => {
  return (
    <Image
      style={styles.logoStyle}
      source={require('../assets/images/logo-rm.png')}
    />
  );
};
const styles = StyleSheet.create({
  logoStyle: {
    height: 200,
    width: 300,
    marginVertical: themes.Spacing.extra_large,
  },
});
export default LogoApp;
