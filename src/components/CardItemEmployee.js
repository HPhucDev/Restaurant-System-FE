import React from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from '../themes';
const CardItemEmployee = ({eventButton, name, role, email, urlImage }) => {
  return (
    <TouchableOpacity style={styles.foodView} onPress={()=> eventButton()}>
      <Image style={styles.iconEmployee} source={{uri: urlImage}} />
      <View style={styles.contentText}>
        <Text style={styles.textStyle}>{name}</Text>
        <Text style={[styles.textStyle, styles.priceText]}>
          Chức vụ: {role}
        </Text>
        <Text style={[{fontSize: 13, color: themes.Colors.black, marginRight: 100}, styles.priceText]}>
          Email: {email}
        </Text>
      </View>
      <Icon name="star" size={20} style={styles.iconStarStyle} />
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
  iconEmployee: {
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
export default CardItemEmployee;
