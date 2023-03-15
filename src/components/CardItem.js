import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from '../themes';
const CardItem = (props) => {
  return (
    <TouchableOpacity style={styles.foodView} onPress={()=> props.eventButton()}>
      <Image style={styles.iconFood} source={{uri: props.urlImages}} />
      <View style={styles.contentText}>
        <Text style={styles.textStyle}>{props.nameFood}</Text>
        <Text style={[styles.textStyle, styles.priceText]}>
          {props.price} đ
        </Text>
      </View>
      <Icon name="star" size={20} style={[styles.iconStarStyle, {color: props.visible ? themes.Colors.primary : themes.Colors.dark_gray}]} />
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
    fontSize: themes.Text.titleText,
    color: themes.Colors.dark_grown,
  },
  priceText: {
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  iconStarStyle: {
    position: 'absolute',
    right: themes.Spacing.medium,
    alignSelf: 'center',
    color: themes.Colors.primary,
  },
});
export default CardItem;
