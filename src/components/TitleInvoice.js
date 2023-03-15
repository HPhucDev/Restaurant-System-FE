import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themes from '../themes';
import StatusBarCustom from './StatusBarCustom';

const TitleInvoice = ({eventGoBack, title, eventRemove}) => {
  return (
    <React.Fragment>
      <StatusBarCustom />
      <View style={styles.titleView}>
        <TouchableOpacity
          style={styles.iconTitle}
          onPress={eventGoBack}>
          <AntDesign name="close" size={28} color={themes.Colors.black} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={eventRemove}>
          <Text style={styles.cancelText}>Hủy HĐ</Text>
          </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: themes.Spacing.medium,
  },
  iconTitle: {
    position: 'absolute',
    left: themes.Spacing.medium,
  },
  titleText: {
    textAlign: 'center',
    fontSize: themes.Text.titleBar,
    color: themes.Colors.black,
  },
  cancelButton:{
    position: 'absolute',
    right: themes.Spacing.medium,
    paddingHorizontal: themes.Spacing.medium
  },
  cancelText:{
    fontSize: themes.Text.dateText,
    color: themes.Colors.black,
    fontWeight: 'bold'
  }
});
export default TitleInvoice;
