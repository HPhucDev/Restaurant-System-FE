import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from '../themes';
import convertNameTable from '../utils/convertNameTable';
const BillItem = ({tableName, idOrder, quantity, status, eventButton}) => {
  return (
    <TouchableOpacity style={styles.billView} onPress={eventButton}>
      <View style={styles.tableView}>
        <Text style={styles.tableText}>{convertNameTable(tableName)}</Text>
      </View>
      <View style={styles.contentText}>
        <Text style={styles.textStyle}>Mã hóa đơn: #{idOrder}</Text>
        <Text style={[styles.textStyle, styles.priceText]}>
          Tổng món: {quantity}
        </Text>
        <Text style={[styles.textStyle, styles.statusText]}>
          Trạng thái: {status}
        </Text>
      </View>
      <Icon name="star" size={20} style={styles.iconStarStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  billView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    borderRadius: 10,
    elevation: 5,
  },
  tableView: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: themes.Colors.primary,
  },
  tableText:{
    fontSize: themes.Text.titleText,
  },
  contentText: {
    marginHorizontal: themes.Spacing.medium,
  },
  textStyle: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.lable_text,
  },
  statusText: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginTop: themes.Spacing.large,
    color: themes.Colors.done,
  },
  iconStarStyle: {
    position: 'absolute',
    right: themes.Spacing.medium,
    alignSelf: 'center',
    color: themes.Colors.primary,
  },
});
export default BillItem;
