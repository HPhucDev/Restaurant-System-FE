import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import themes from '../themes';

const ButtonPrimary = (props) => {
  return (
    <TouchableOpacity
      style={styles.loginBtn}
      onPress={() => props.eventButton()}>
      <Text style={styles.loginText}>{props.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    loginBtn: {
        width: '80%',
        backgroundColor: themes.Colors.primary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: themes.Spacing.extra_large,
        paddingVertical: themes.Spacing.large
      },
      loginText: {
        color: themes.Colors.white,
        fontSize: themes.Text.titleBar,
      },
})
export default ButtonPrimary;
