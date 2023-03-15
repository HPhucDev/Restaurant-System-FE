import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import themes from '../themes';

const ButtonSave = ({eventButton, name}) => {
    return (
      <TouchableOpacity style={styles.buttonCheckOutView} onPress={eventButton}>
        <LinearGradient
          style={{
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[themes.Colors.start, themes.Colors.end]}>
          <Text style={styles.buttonCheckOutText}>{name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    buttonCheckOutView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
      },
      buttonCheckOutText: {
        color: themes.Colors.white,
        fontSize: themes.Text.titleBar,
        paddingVertical: themes.Spacing.large,
      },
  })

  export default ButtonSave;