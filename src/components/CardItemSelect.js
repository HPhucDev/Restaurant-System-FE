import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import themes from '../themes';
import ButtonEditNumber from './ButtonEditNumber';
const CardItemSelect = (props) => {
  return (
    <View style={styles.foodView}>
      <Image style={styles.iconFood} source={{uri: props.urlImages}} />
      <View style={styles.contentText}>
        <Text style={styles.textStyle}>{props.nameFood}</Text>
        <Text style={[styles.textStyle, styles.priceText]}>
          {props.price} vnđ
        </Text>
        <Text style={styles.statusFood}>{props.status}</Text>
      </View>
      <View style={styles.editNumber}>
        <ButtonEditNumber name="minuscircleo" eventButton={()=> props.eventButtonMinus()}/>
        <Text style={styles.numberText}>{props.numberItem}</Text>
        <ButtonEditNumber name="pluscircleo" eventButton={()=> props.eventButtonPlus()}/>
      </View>
      <TouchableOpacity style={styles.trashStyle} onPress={()=> props.eventRemoveFood()}>
      <Fontisto
        name="trash"
        size={20}
        color={themes.Colors.danger}
      />
      </TouchableOpacity>
    </View>
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
  statusFood:{
    fontSize: 14,
    fontStyle: 'italic',
    color: themes.Colors.done,
    marginTop: themes.Spacing.large,
  },
  iconStarStyle: {
    position: 'absolute',
    right: themes.Spacing.medium,
    alignSelf: 'center',
    color: themes.Colors.primary,
  },
  editNumber: {
    position: 'absolute',
    right: themes.Spacing.extra_large,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: themes.Spacing.small
  },
  numberText: {
    fontSize: 18,
    color: themes.Colors.dark_grown,
    fontWeight: 'bold',
  },
  trashStyle:{
    position: 'absolute',
    right: 10,
    top: 4
  }
});
export default CardItemSelect;
