import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import themes from '../themes';
import convertStatusOrder from '../utils/convertStatusOrder';

const CardItemKitchen = (props) => {
  return (
    <TouchableOpacity style={styles.foodView} onPress={() => props.eventButton()}>
      <Image style={styles.iconFood} source={{uri: props.urlImages}} />
      <View style={styles.contentText}>
        <Text style={styles.textStyle}>{props.nameFood}</Text>
        <Text style={[styles.textStyle, styles.priceText]}>
          {props.price} vnđ
        </Text>
        <Text style={styles.statusFood}>Ghi chú: {props.note}</Text>
        <View style={styles.editNumber}>
          <Text style={styles.statusOrder}>
            {convertStatusOrder(props.status)}
          </Text>
        </View>
      </View>
      <Text style={styles.numberText}>Số lượng: {props.numberItem}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    borderRadius: 10,
    elevation: 5,
  },
  iconFood: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  contentText: {
    marginHorizontal: themes.Spacing.medium,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: themes.Colors.dark_grown,
  },
  priceText: {
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  statusFood: {
    fontSize: 14,
    fontStyle: 'italic',
    color: themes.Colors.done,
    marginTop: themes.Spacing.small,
  },
  statusOrder: {
    fontSize: 14,
    fontStyle: 'italic',
    color: themes.Colors.danger,
  },
  editNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberText: {
    position: 'absolute',
    right: 30,
    bottom: 10,
    fontSize: 18,
    color: themes.Colors.dark_grown,
    fontWeight: 'bold',
    marginLeft: themes.Spacing.extra_large,
  },
});
export default CardItemKitchen;
