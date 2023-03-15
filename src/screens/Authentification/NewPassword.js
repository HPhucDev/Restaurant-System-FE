import React, {useState} from 'react';
import LogoApp from '../../components/LogoApp';
import themes from '../../themes';
import i18n from '../../assets/utils/i18n';
import Spinner from '../../components/Spinner';
import StatusBarCustom from '../../components/StatusBarCustom';
import ButtonPrimary from '../../components/ButtonPrimary';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { resetPassword } from '../../api/forgotPassword';

const NewPassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] =  useState(props.route.params.email);
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const validInput = () =>{
    if(passwordNew === ''){
      Alert.alert("Thông báo","Không được bỏ trống.")
      return false;
    }
    else if(passwordNew !== passwordConfirm){
      Alert.alert("Thông báo","Mật khẩu xác thực không khớp.")
      return false;
    }
    return true;
  };

  const handleConfirm = async()=>{
    if(validInput()){
      setLoading(true);
      await resetPassword({
        token: props.route.params.token,
        password: passwordNew,
        confirmPassword: passwordConfirm,
      })
      .then((response)=>{
        setLoading(false);
        Alert.alert("Thông báo","Mật khẩu thay đổi thành công.")
        props.navigation.navigate('signInScreen', {email: userEmail})  
      })
      .catch((error)=>{
        setLoading(false);
        console.log(error.response);
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <ScrollView>
        <View style={styles.contentView}>
          <LogoApp />
          <TextInput
            secureTextEntry
            value={passwordNew}
            style={styles.inputText}
            placeholder={i18n.t('password_new_text')}
            placeholderTextColor={themes.Colors.black}
            onChangeText={(value) => setPasswordNew(value)}
          />
          <TextInput
            secureTextEntry
            value={passwordConfirm}
            style={styles.inputText}
            placeholder={i18n.t('password_confirm')}
            placeholderTextColor={themes.Colors.black}
            onChangeText={(value) => setPasswordConfirm(value)}
          />
          <ButtonPrimary name={i18n.t('password_confirmed')} eventButton={handleConfirm}/>
          <Spinner isVisible={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
      alignItems: 'center'
  },
  inputText: {
    width: '80%',
    backgroundColor: themes.Colors.light,
    borderRadius: 10,
    marginBottom: themes.Spacing.medium,
    justifyContent: 'center',
    padding: 15,
  },
});
export default NewPassword;
