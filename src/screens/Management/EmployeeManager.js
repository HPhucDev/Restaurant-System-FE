import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StatusBarCustom from '../../components/StatusBarCustom';
import {TitleBar} from '../../components/TitleBar';
import themes from '../../themes';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmployeeManager = (props) => {
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
      <StatusBarCustom />
      <TitleBar
        name="Quản lý nhân viên"
        eventButton={() => props.navigation.goBack()}
      />
      <View style={styles.contentView}>
        <ButtonViewCustom
          name="user-plus"
          text="Thêm nhân viên mới"
          eventButton={() =>
            props.navigation.navigate('addEmployee', {option: '', user: {}})
          }
        />
        <ButtonViewCustom
          name="list-alt"
          text="Danh sách nhân viên"
          eventButton={() => props.navigation.navigate('listEmployee')}
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
export default EmployeeManager;
