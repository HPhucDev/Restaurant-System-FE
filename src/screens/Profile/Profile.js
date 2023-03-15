import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import StatusBarCustom from '../../components/StatusBarCustom';
import * as actions from '../../redux/actions';
import {TextInput, RadioButton} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import themes from '../../themes';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import {TitleBarSave} from '../../components/TitleBar';
import {toDate, getFormattedDate} from '../../utils/dateTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import SpinnerCustom from '../../components/Spinner';
import {resetPasswordUser, updateUser} from '../../api/UserApi';
import uuid from 'react-native-uuid';

const Profile = (props) => {
  const regexEmail = new RegExp(
    '^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$',
  );
  const regexPhoneNumber = new RegExp('(84|0[3|5|7|8|9])+([0-9]{8})\\b');
  const [user, setUser] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
  });
  const [visible, setIsVisible] = useState(false);
  const [dateCalender, setDateCalender] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(props.user);
    setDateCalender(
      toDate(props.user.birthDay ? props.user.birthDay : '01-01-1990'),
    );
  }, [props.user]);

  const changeAvatar = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setUser({...user, pathAvatar: image.path});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkRadio = () => {
    setUser({
      ...user,
      gender: user.gender === 'FEMALE' ? 'MALE' : 'FEMALE',
    });
  };

  const clickChevronIcon = () => {
    setShowPass(!showPass);
  };

  const onChangeCalendar = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || dateCalender;
    setDateCalender(currentDate);
    setUser({...user, birthDay: getFormattedDate(currentDate)});
  };

  const validInput = () => {
    if (user.pathAvatar === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn ảnh');
      return;
    } else if (user.fullName === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập họ và tên');
      return;
    } else if (user.gender === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn giới tính');
      return;
    } else if (!regexPhoneNumber.test(user.phone)) {
      Alert.alert('Thông báo', 'Sai định dạng số điện thoại');
      return;
    }
    return true;
  };

  const updateData = async () => {
    if (validInput()) {
      setLoading(true);
      const userUpdate = {
        id: user.userId,
        fullName: user.fullName,
        gender: user.gender,
        phone: user.phone,
        pathAvatar: user.pathAvatar,
        birthDay: user.birthDay,
        role: user.role,
        status: 'ACTIVE',
      };
      try {
        const formData = new FormData();
        formData.append('userDTO', JSON.stringify(userUpdate));
        formData.append('avatar', {
          uri: user.pathAvatar,
          type: 'image/jpeg',
          name: uuid.v4() + '.jpg',
        });

        await updateUser({
          formData: formData,
          id: user.userId,
        })
          .then((response) => {
            const resUser = response.data;
            props.loadDataUser({
              ...user,
              fullName: resUser.fullName,
              gender: resUser.gender,
              phone: resUser.phone,
              pathAvatar: resUser.pathAvatar,
              birthDay: user.birthDay,
              role: user.role,
            });
            setLoading(false);
            Alert.alert('Thông báo', 'Cập nhật thông tin thành công.');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            Alert.alert('Thông báo', 'Cập nhật thông tin thất bại.');
          });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const validInputPassword = () => {
    if (password.oldPassword === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu cũ!');
      return;
    } else if (password.newPassword === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu mới!');
      return;
    } else if (password.verifyPassword === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập xác nhận mật khẩu!');
      return;
    } else if (password.verifyPassword !== password.newPassword) {
      Alert.alert('Thông báo', 'Mật khẩu xác nhận không khớp!');
      return;
    }
    return true;
  };

  const updatePassword = async () => {
    if (validInputPassword()) {
      setLoading(true);
      await resetPasswordUser({
        id: user.userId,
        newPassword: password.newPassword,
        confirmPassword: password.verifyPassword,
        oldPassword: password.oldPassword,
      })
        .then((response) => {
          setLoading(false);
          Alert.alert('Thông báo', 'Cập nhật mật khẩu thành công!');
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Thông báo', 'Cập nhật mật khẩu thất bại');
          console.log(error.response);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <TitleBarSave
        name="Thông tin cá nhân"
        eventButton={props.navigation.goBack}
        saveEvent={updateData}
      />
      <SpinnerCustom isVisible={loading} />
      <ScrollView>
      <View style={styles.imageView}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <ImageView
            images={[{uri: user.pathAvatar}]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <Image
            source={{
              uri: user.pathAvatar,
            }}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeAvatar()}>
          <Text style={styles.textImageButton}>Thay ảnh đại diện</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView style={styles.inputView}>
        <TextInput
          label="Họ và tên"
          style={styles.inputStyle}
          theme={{colors: {primary: themes.Colors.primary}}}
          value={user.fullName}
          onChangeText={(value) => setUser({...user, fullName: value})}
        />
        <TextInput
          label="Tên đăng nhập"
          disabled={true}
          style={styles.inputStyle}
          value={user.username}
          onChangeText={(value) => setUser({...user, username: value})}
        />
        <View style={styles.line} />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateCalender}
            mode="date"
            is24Hour={true}
            display={
              Platform.OS === 'ios' && Platform.Version >= 14.4
                ? 'inline'
                : 'default'
            }
            onChange={onChangeCalendar}
            dateFormat="day month year"
          />
        )}
        <TouchableOpacity
          style={styles.specialInputView}
          onPress={() => setShowDatePicker(true)}>
          <Text
            style={[
              {
                color: themes.Colors.dark_gray,
                marginHorizontal: themes.Spacing.medium,
              },
            ]}>
            Ngày sinh
          </Text>
          <Text style={{margin: themes.Spacing.medium}}>
            {getFormattedDate(dateCalender)}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />

        {/* <TextInput
          label="Ngày sinh"
          style={styles.inputStyle}
          value={user.birthDay}
          onChangeText={(value) => setUser({...user, birthDay: value})}
          theme={{colors: {primary: themes.Colors.primary}}}
          keyboardType="number-pad"
          render={(props) => (
            <TextInputMask
              {...props}
              type={'datetime'}
              options={{format: 'DD-MM-YYYY'}}
            />
          )}
        /> */}
        <View style={styles.genderView}>
          <Text
            style={{
              marginLeft: themes.Spacing.medium,
              color: themes.Colors.light_gray,
            }}>
            Giới tính
          </Text>
          <View style={styles.flexView}>
            <RadioButton
              value="Male"
              onPress={checkRadio}
              status={user.gender === 'MALE' ? 'checked' : 'unchecked'}
            />
            <Text style={styles.radioStyle}>Nam</Text>
            <RadioButton
              value="Female"
              onPress={checkRadio}
              status={user.gender === 'FEMALE' ? 'checked' : 'unchecked'}
            />
            <Text style={styles.radioStyle}>Nữ</Text>
          </View>
        </View>
        <TextInput
          label="Số điện thoại"
          style={styles.inputStyle}
          value={user.phone}
          onChangeText={(value) => setUser({...user, phone: value})}
          keyboardType="phone-pad"
          disabled={regexPhoneNumber.test(user.username) ? true : false}
        />
        <View style={styles.inputView}>
          <View style={styles.flexView}>
            <Text style={styles.passwordText}>Thay đổi mật khẩu</Text>
            <TouchableOpacity
              style={styles.iconChevron}
              onPress={clickChevronIcon}>
              <Icon name={showPass === true ? 'chevron-down' : 'chevron-up'} />
            </TouchableOpacity>
          </View>
          {showPass && (
            <View>
              <TextInput
                label="Mật khẩu cũ"
                style={styles.inputStyle}
                value={password.oldPassword}
                theme={{colors: {primary: themes.Colors.primary}}}
                onChangeText={(value) =>
                  setPassword({...password, oldPassword: value})
                }
                secureTextEntry={true}
              />
              <TextInput
                label="Mật khẩu mới"
                style={styles.inputStyle}
                theme={{colors: {primary: themes.Colors.primary}}}
                value={password.newPassword}
                onChangeText={(value) =>
                  setPassword({...password, newPassword: value})
                }
                secureTextEntry={true}
              />
              <TextInput
                label="Xác nhận mật khẩu"
                style={styles.inputStyle}
                theme={{colors: {primary: themes.Colors.primary}}}
                value={password.verifyPassword}
                onChangeText={(value) =>
                  setPassword({...password, verifyPassword: value})
                }
                secureTextEntry={true}
              />
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => updatePassword()}>
                <LinearGradient
                  style={styles.linearView}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[themes.Colors.start, themes.Colors.end]}>
                  <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      </ScrollView>
      
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => props.navigation.navigate('signInScreen')}>
        <Text style={styles.buttonLogoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    alignItems: 'center',
    marginVertical: themes.Spacing.large,
  },
  imageStyle: {
    width: 90,
    height: 90,
    margin: themes.Spacing.medium,
    borderRadius: 45,
  },
  textImageButton: {
    fontFamily: 'Montserrat-Medium',
    fontSize: themes.Text.titleBar,
    color: themes.Colors.primary,
  },
  iconChevron: {
    position: 'absolute',
    right: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
  },
  inputView: {
    marginVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    paddingHorizontal: themes.Spacing.large,
    paddingVertical: themes.Spacing.large,
  },
  inputStyle: {
    backgroundColor: themes.Colors.white,
    marginBottom: themes.Spacing.small,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {width: '85%', alignSelf: 'center'},
  linearView: {
    alignItems: 'center',
    padding: 13,
    borderRadius: 5,
  },
  buttonLogout: {
    alignItems: 'center',
    padding: themes.Spacing.large,
    borderRadius: 5,
    borderWidth: 0.5,
    marginBottom: themes.Spacing.medium,
    borderRadius: 10,
    marginHorizontal: themes.Spacing.medium,
    borderColor: themes.Colors.danger,
    backgroundColor: themes.Colors.white,
  },
  buttonLogoutText: {
    color: themes.Colors.danger,
    fontSize: themes.Text.titleText,
  },
  buttonText: {color: themes.Colors.white, fontSize: themes.Text.titleText},
  line: {
    borderBottomWidth: 0.8,
    borderBottomColor: themes.Colors.light_gray,
  },
  specialInputView: {
    marginVertical: themes.Spacing.medium,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(Profile);
