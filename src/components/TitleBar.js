import React from 'react';
import themes from '../themes';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
const TitleBar = (props) => {
  return (
    <View>
      <LinearGradient
        style={styles.titleView}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[themes.Colors.start, themes.Colors.end]}>
        <TouchableOpacity
          style={styles.backIconStyle}
          onPress={() => props.eventButton()}>
          <Feather name="arrow-left" size={25} color={themes.Colors.white} />
        </TouchableOpacity>
        <Text style={styles.textTitleStyle}>{props.name}</Text>
        {/* <TouchableOpacity
          style={styles.homeButton}
          onPress={() => props.goHomeEvent()}>
          <Text style={styles.textHomeStyle}>Home</Text>
        </TouchableOpacity> */}
      </LinearGradient>
    </View>
  );
};

const TitleBarSave = (props) => {
  return (
    <View>
      <LinearGradient
        style={styles.titleView}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[themes.Colors.start, themes.Colors.end]}>
        <TouchableOpacity
          style={styles.backIconStyle}
          onPress={() => props.eventButton()}>
          <Feather name="arrow-left" size={25} color={themes.Colors.white} />
        </TouchableOpacity>
        <Text style={styles.textTitleStyle}>{props.name}</Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => props.saveEvent()}>
          <Text style={styles.textHomeStyle}>Lưu</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const TitleBarRemove = (props) => {
  return (
    <View>
      <LinearGradient
        style={styles.titleView}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[themes.Colors.start, themes.Colors.end]}>
        <TouchableOpacity
          style={styles.backIconStyle}
          onPress={() => props.eventButton()}>
          <Feather name="arrow-left" size={25} color={themes.Colors.white} />
        </TouchableOpacity>
        <Text style={styles.textTitleStyle}>{props.name}</Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => props.removeEvent()}>
          <Text style={styles.textHomeStyle}>{props.nameRemove}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    backgroundColor: '#faa06b',
    height: 50,
    justifyContent: 'center',
  },
  backIconStyle: {
    position: 'absolute',
    left: 2,
  },
  textTitleStyle: {
    fontSize: themes.Text.titleBar,
    alignSelf: 'center',
    color: themes.Colors.white,
  },
  homeButton: {
    position: 'absolute',
    justifyContent: 'center',
    right: themes.Spacing.medium,
  },
  textHomeStyle: {
    fontSize: themes.Text.titleBar,
    color: themes.Colors.white,
    fontWeight: '600',
  },
});
export {TitleBar, TitleBarSave, TitleBarRemove};
