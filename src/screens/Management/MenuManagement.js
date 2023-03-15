import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TitleBar, TitleBarRemove} from '../../components/TitleBar';
import themes from '../../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
const MenuManagement = (props) => {
  const ButtonViewCustom = (props) => {
    return (
      <TouchableOpacity
        style={styles.buttonView}
        onPress={() => props.eventButton()}>
        <Icon
          name={props.name}
          size={40}
          color={themes.Colors.primary}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TitleBarRemove
        name="Quản lý thực đơn"
        nameRemove="Trở về"
        eventButton={() => props.navigation.goBack()}
        removeEvent={() => props.navigation.navigate('signInScreen')}
      />
      <View style={styles.contentView}>
        <ButtonViewCustom
          name="user-plus"
          text="Thêm món mới"
          eventButton={() =>
            props.navigation.navigate('addFoodItem', {option: '', idFood: 0})
          }
        />
        <ButtonViewCustom
          name="list-alt"
          text="Xem danh sách/chỉnh sửa món"
          eventButton={() => props.navigation.navigate('listFoodItem')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  contentView: {
    alignItems: 'center',
    marginTop: themes.Spacing.extra_large,
  },
  iconStyle: {
    marginLeft: themes.Spacing.large,
  },
  buttonView: {
    flexDirection: 'row',
    backgroundColor: themes.Colors.button,
    borderColor: themes.Colors.primary,
    borderWidth: 0.5,
    width: '85%',
    marginVertical: themes.Spacing.small,
    paddingVertical: themes.Spacing.medium,
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: themes.Text.titleText,
    marginLeft: themes.Spacing.large,
    color: themes.Colors.primary,
  },
});
export default MenuManagement;
