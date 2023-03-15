import React from 'react';
import StatusBarCustom from '../../components/StatusBarCustom';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from '../../themes';

const FunctionStaff = ({navigation}) => {
  
  const handleSubmitBill = ()=>{
    navigation.navigate('mainDeskStaff');
  };
  
  const handleSubmitMenu = ()=>{
    navigation.navigate('menu', { option: 'function'});
  };

  const handleSubmitListBill = ()=>{
    navigation.navigate('bills');
  }
  const ButtonViewCustom = (props) => {
    return (
      <TouchableOpacity style={styles.buttonView} onPress={()=> props.eventButton()}>
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
      <View style={styles.contentView}>
        <ButtonViewCustom name="list-ul" text="Lập đơn hàng" eventButton={handleSubmitBill}/>
        <ButtonViewCustom name="book" text="Xem menu" eventButton={handleSubmitMenu}/>
        <ButtonViewCustom name="list-alt" text="Hóa đơn đã lập" eventButton={handleSubmitListBill}/>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
    justifyContent: 'center',
  },
  contentView: {
    alignItems: 'center',
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
export default FunctionStaff;
