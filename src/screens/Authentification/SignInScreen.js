import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../assets/utils/i18n';
import Spinner from '../../components/Spinner';
import themes from '../../themes';
import StatusBarCustom from '../../components/StatusBarCustom';
import LogoApp from '../../components/LogoApp';
import ButtonPrimary from '../../components/ButtonPrimary';
import * as actions from '../../redux/actions';

import {connect} from 'react-redux';
import {signInApi} from '../../api/authenticationApi';
import {getStatusTableByOrder} from '../../api/orderApi';

const SignInScreen = (props) => {
  const [userEmail, setUserEmail] = useState('nhanvienbep@gmail.com');
  const [userPassword, setUserPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);

  const checkRole = (role) => {
    if (role === 'KITCHEN_STAFF') {
      props.navigation.navigate('mainKitChenStaff');
    } else if (role === 'DESK_STAFF') {
      props.navigation.navigate('mainDeskStaff');
    } else if (role === 'CASHIER_STAFF') {
      props.navigation.navigate('mainCashierStaff');
    } else if (role === 'MANAGER') {
      props.navigation.navigate('managementStaff');
    }
  };

  const loadData = async () => {
    await getStatusTableByOrder()
      .then((response) => {
        props.loadOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitPress = async () => {
    if (!userEmail) {
      Alert.alert(i18n.t('notification'), i18n.t('notification_email_empty'));
      return;
    }
    if (!userPassword) {
      Alert.alert(
        i18n.t('notification'),
        i18n.t('notification_password_empty'),
      );
      return;
    }
    setLoading(true);

    await signInApi({
      username: userEmail,
      password: userPassword,
    })
      .then(async (response) => {
        const user = {
          userId: response.data.userId,
          username: response.data.username,
          fullName: response.data.fullName,
          role: response.data.role,
          phone: response.data.phone,
          pathAvatar: response.data.pathAvatar,
          gender: response.data.gender,
          birthDay: response.data.birthDay,
        };
        await AsyncStorage.setItem('@AccessToken', response.data.accessToken);
        props.loadDataUser(user);
        await loadData();
        checkRole(response.data.role);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Thông báo', 'Vui lòng kiểm tra Email/ Mật khẩu !');
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <LogoApp />
          <TextInput
            value={userEmail}
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor={themes.Colors.black}
            onChangeText={(userEmail) => setUserEmail(userEmail)}
          />
          <TextInput
            value={userPassword}
            secureTextEntry
            style={styles.inputText}
            placeholder={i18n.t('password_text')}
            placeholderTextColor={themes.Colors.black}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
          />
          <TouchableOpacity
            style={styles.forgotStyle}
            onPress={() => props.navigation.navigate('forgotPassword')}>
            <Text style={styles.forgotText}>
              {i18n.t('forgot_password_text')}
            </Text>
          </TouchableOpacity>
          <ButtonPrimary
            name={i18n.t('login_text')}
            eventButton={() => handleSubmitPress()}
          />
          <Spinner isVisible={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
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
  forgotStyle: {
    width: '80%',
  },
  forgotText: {
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
});
const mapStateToProps = (state) => ({
  foods: state.foods,
  user: state.user,
  orders: state.orders,
});
export default connect(mapStateToProps, actions)(SignInScreen);
