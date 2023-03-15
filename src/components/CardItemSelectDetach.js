import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import themes from '../themes';
const CardItemSelectDetach = ({urlImages,price, nameFood,numberItem, status, eventButton}) => {
  return (
    <TouchableOpacity style={styles.foodView} onPress={eventButton}>
      <Image style={styles.iconFood} source={{uri: urlImages}} />
      <View style={styles.contentText}>
        <Text style={styles.textStyle}>{nameFood}</Text>
        <Text style={[styles.textStyle, styles.priceText]}>
          {price} vnđ
        </Text>
        <Text style={styles.statusFood}>{status}</Text>
      </View>
      <View style={styles.editNumber}>
      <Text style={styles.numberText}>Số lượng: {' '}</Text>
        <Text style={styles.numberText}>{numberItem}</Text>
      </View>
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
    width: 80,
    height: 80,
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
  statusFood:{
    fontSize: 14,
    fontStyle: 'italic',
    color: themes.Colors.done,
    marginTop: themes.Spacing.large,
  },
  editNumber: {
    position: 'absolute',
    right: themes.Spacing.large,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: themes.Spacing.small
  },
  numberText: {
    fontSize: 18,
    color: themes.Colors.dark_grown,
    fontWeight: 'bold',
  },
});
export default CardItemSelectDetach;
