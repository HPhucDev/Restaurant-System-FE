import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  View,
} from 'react-native';
import i18n from '../../assets/utils/i18n';
import Spinner from '../../components/Spinner';
import themes from '../../themes';
import StatusBarCustom from '../../components/StatusBarCustom';
import LogoApp from '../../components/LogoApp';
import ButtonPrimary from '../../components/ButtonPrimary';
import { forgotPassword, verifiedOTP } from '../../api/forgotPassword';

const ForgotPasswordOTP = (props) => {
  return (
    <View style={styles.otpView}>
      <TextInput
        value={props.value}
        style={styles.inputText}
        keyboardType='number-pad'
        placeholder="OTP Code..."
        placeholderTextColor={themes.Colors.black}
        onChangeText={(value) => props.onChangeText(value)}
      />
      <ButtonPrimary
        name={i18n.t('verified_text')}
        eventButton={() => props.eventButton()}
      />
    </View>
  );
};

const ForgotPassword = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSendOpt, setIsSendOpt] = useState(false);

  const handleSubmitPress = async() => {
    
    const regexEmail = new RegExp(
      '^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$',
    );
    if (!userEmail) {
      Alert.alert(i18n.t('notification'), i18n.t('notification_email_empty'));
      return;
    }
    else if(!regexEmail.test(userEmail)){
      Alert.alert(i18n.t('notification'), "Nhập sai định dạng email.");
      return;
    }
      setLoading(true);
      await forgotPassword({
        email: userEmail
      })
      .then((response)=>{
        setLoading(false);
        Alert.alert(i18n.t('notification'), "Mã OTP đã được gửi tới email của bạn.");
        setIsSendOpt(true);
      })
      .catch((error)=>{
        setLoading(false);
        console.log(error);
      });
  };

  const handleSubmitOtp = async() => {
    setLoading(true);
    await verifiedOTP({
      otp: otp
    })
    .then((response)=>{
      setLoading(false);
      navigation.navigate('newPassword', {email: userEmail, token: response.data.token});
    })
    .catch((error)=>{
      setLoading(false);
      Alert.alert(i18n.t('notification'), "Mã OTP không chính xác.");
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <LogoApp />
      <TextInput
        style={styles.inputText}
        placeholder="Email..."
        placeholderTextColor={themes.Colors.black}
        onChangeText={(userEmail) => setUserEmail(userEmail)}
      />
      {isSendOpt ? (
        <ForgotPasswordOTP
          value={otp}
          onChangeText={(value) => setOTP(value)}
          eventButton={handleSubmitOtp}
        />
      ) : (
        <ButtonPrimary
          name={i18n.t('verified_text')}
          eventButton={() => handleSubmitPress()}
        />
      )}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{i18n.t('back_text')}</Text>
      </TouchableOpacity>
      <Spinner isVisible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
    alignItems: 'center',
  },
  logoStyle: {
    height: 200,
    width: 300,
    marginVertical: themes.Spacing.extra_large,
  },
  inputText: {
    width: '80%',
    backgroundColor: themes.Colors.light,
    borderRadius: 10,
    marginBottom: themes.Spacing.medium,
    justifyContent: 'center',
    padding: 15,
  },
  forgot: {
    color: themes.Colors.black,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: themes.Colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: themes.Spacing.extra_large,
  },
  loginText: {
    color: themes.Colors.white,
    fontSize: themes.Text.titleBar,
  },
  backText: {
    color: themes.Colors.black,
    marginTop: themes.Spacing.medium,
    textDecorationLine: 'underline',
  },
  otpView: {
    width: '100%',
    alignItems: 'center',
  },
});
export default ForgotPassword;
