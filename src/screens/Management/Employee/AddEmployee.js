import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Switch,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import SpinnerCustom from "../../../components/Spinner";
import StatusBarCustom from "../../../components/StatusBarCustom";
import { TitleBarSave } from "../../../components/TitleBar";
import themes from "../../../themes";
import ImageView from "react-native-image-viewing";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getFormattedDate, toDate } from "../../../utils/dateTime";
import { TextInput, RadioButton } from "react-native-paper";
import ModalSelectRole from "../../../components/ModalSelectRole";
import ImagePicker from "react-native-image-crop-picker";
import uuid from "react-native-uuid";
import { createUser, updateUser } from "../../../api/UserApi";
import convertPosition from "../../../utils/convertPositions";

const AddEmployee = (props) => {
  const option = props.route.params.option;
  const userParams = props.route.params.user;

  const regexEmail = new RegExp(
    "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$"
  );
  const regexPhoneNumber = new RegExp("(84|0[3|5|7|8|9])+([0-9]{8})\\b");

  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [visibleModalRole, setIsVisibleModalRole] = useState(false);
  const [dateCalender, setDateCalender] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [user, setUser] = useState({
    email: "",
    fullName: "",
    birthDay: getFormattedDate(new Date()),
    gender: "",
    idRestaurant: 1,
    password: "",
    phone: "",
    role: "",
    pathAvatar: "",
    status: "",
  });

  const [statusEnable, setStatusEnable] = useState(false);

  useEffect(() => {
    if (option === "EDIT") {
      setUser(userParams);
    }
  }, []);

  const checkRadio = () => {
    setUser({
      ...user,
      gender: user.gender === "FEMALE" ? "MALE" : "FEMALE",
    });
  };

  const onChangeCalendar = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || dateCalender;
    setDateCalender(currentDate);
    setUser({
      ...user,
      birthDay: getFormattedDate(currentDate),
    });
  };

  const validInput = () => {
    if (user.pathAvatar === "") {
      Alert.alert("Thông báo", "Vui lòng chọn ảnh");
      return;
    } else if (user.fullName === "") {
      Alert.alert("Thông báo", "Vui lòng nhập họ và tên");
      return;
    } else if (!regexEmail.test(user.email)) {
      Alert.alert("Thông báo", "Sai định dạng email");
      return;
    } else if (user.gender === "") {
      Alert.alert("Thông báo", "Vui lòng chọn giới tính");
      return;
    } else if (!regexPhoneNumber.test(user.phone)) {
      Alert.alert("Thông báo", "Sai định dạng số điện thoại");
      return;
    } else if (user.password.length < 6) {
      Alert.alert("Thông báo", "Mật khẩu phải lớn hơn 6 kí tự");
      return;
    } else if (user.role === "") {
      Alert.alert("Thông báo", "Vui lòng chọn chức vụ");
      return;
    }
    return true;
  };

  const findRole = (role) => {
    if (role.desk) {
      setUser({
        ...user,
        role: "DESK_STAFF",
      });
    } else if (role.cashier) {
      setUser({
        ...user,
        role: "CASHIER_STAFF",
      });
    } else if (role.kitchen) {
      setUser({
        ...user,
        role: "KITCHEN_STAFF",
      });
    } else if (role.management) {
      setUser({
        ...user,
        role: "MANAGER",
      });
    }
    setIsVisibleModalRole(false);
  };

  const openLib = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setUser({
          ...user,
          pathAvatar: image.path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setUser({
          ...user,
          pathAvatar: image.path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createUserEmployee = async () => {
    if (validInput()) {
      const formData = new FormData();
      formData.append("userDTO", JSON.stringify(user));
      formData.append("avatar", {
        uri: user.pathAvatar,
        type: "image/jpeg",
        name: uuid.v4() + ".jpg",
      });
      setLoading(true);
      if (option === "EDIT") {
        await updateUser({
          formData: formData,
          id: user.id,
        })
          .then((response) => {
            setLoading(false);
            Alert.alert("Thông báo", "Cập nhật thông tin thành công.");
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            Alert.alert("Thông báo", "Cập nhật thông tin thất bại.");
          });
      } else {
        await createUser({
          formData: formData,
        })
          .then((response) => {
            setLoading(false);
            setUser({
              email: "",
              fullName: "",
              birthDay: getFormattedDate(new Date()),
              gender: "",
              idRestaurant: 1,
              password: "",
              phone: "",
              role: "",
              pathAvatar: "",
              status: "",
            });
            Alert.alert("Thông báo", "Thêm thành công nhân viên!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            Alert.alert("Thông báo", "Thêm thất bại!");
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalSelectRole
        visible={visibleModalRole}
        eventButtonCancel={() => setIsVisibleModalRole(false)}
        eventButtonConfirm={(value) => findRole(value)}
      />
      <SpinnerCustom isVisible={loading} />
      <StatusBarCustom />
      <TitleBarSave
        name={option === "EDIT" ? "Chỉnh sửa thông tin" : "Thêm nhân viên"}
        eventButton={props.navigation.goBack}
        saveEvent={() => createUserEmployee()}
      />
      <ScrollView>
        <View style={styles.imageView}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <ImageView
              images={[
                {
                  uri: user.pathAvatar,
                },
              ]}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
            <Image
              source={
                user.pathAvatar
                  ? {
                      uri: user.pathAvatar,
                    }
                  : require("../../../assets/images/food-empty.jpg")
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Thông báo", "Tải lên hình ảnh của bạn bằng", [
                {
                  text: "Camera",
                  onPress: () => openCamera(),
                },
                {
                  text: "Thư viện",
                  onPress: () => openLib(),
                },
              ]);
            }}
          >
            <Text style={styles.textImageButton}>Thay ảnh đại diện</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView style={styles.inputView}>
          <TextInput
            label="Họ và tên"
            value={user.fullName}
            style={styles.inputStyle}
            theme={{ colors: { primary: themes.Colors.primary } }}
            onChangeText={(value) =>
              setUser({
                ...user,
                fullName: value,
              })
            }
          />
          <TextInput
            label="Email"
            value={user.email}
            style={styles.inputStyle}
            theme={{ colors: { primary: themes.Colors.primary } }}
            onChangeText={(value) =>
              setUser({
                ...user,
                email: value,
              })
            }
          />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateCalender}
              mode="date"
              is24Hour={true}
              display={
                Platform.OS === "ios" && Platform.Version >= 14.4
                  ? "inline"
                  : "default"
              }
              onChange={onChangeCalendar}
              dateFormat="day month year"
            />
          )}
          <TouchableOpacity
            style={styles.specialInputView}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={[
                {
                  color: themes.Colors.dark_gray,
                  marginHorizontal: themes.Spacing.medium,
                },
              ]}
            >
              Ngày sinh
            </Text>
            <Text style={{ margin: themes.Spacing.medium }}>
              {getFormattedDate(dateCalender)}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.genderView}>
            <Text
              style={{
                marginLeft: themes.Spacing.medium,
                color: themes.Colors.light_gray,
              }}
            >
              Giới tính
            </Text>
            <View style={styles.flexView}>
              <RadioButton
                value="Male"
                onPress={checkRadio}
                status={user.gender === "MALE" ? "checked" : "unchecked"}
              />
              <Text style={styles.radioStyle}>Nam</Text>
              <RadioButton
                value="Female"
                onPress={checkRadio}
                status={user.gender === "FEMALE" ? "checked" : "unchecked"}
              />
              <Text style={styles.radioStyle}>Nữ</Text>
            </View>
          </View>
          <TextInput
            label="Số điện thoại"
            style={styles.inputStyle}
            theme={{ colors: { primary: themes.Colors.primary } }}
            keyboardType="phone-pad"
            value={user.phone}
            onChangeText={(value) => {
              console.log(value);
              setUser({
                ...user,
                phone: value,
              });
            }}
          />
          {option !== "EDIT" ? (
            <TextInput
              label="Mật khẩu"
              style={styles.inputStyle}
              value={user.password}
              theme={{ colors: { primary: themes.Colors.primary } }}
              onChangeText={(value) =>
                setUser({
                  ...user,
                  password: value,
                })
              }
            />
          ) : null}
          <TouchableOpacity
            style={styles.specialInputView}
            onPress={() => {
              setIsVisibleModalRole(!visibleModalRole);
            }}
          >
            <Text
              style={[
                {
                  color: themes.Colors.dark_gray,
                  marginHorizontal: themes.Spacing.medium,
                },
              ]}
            >
              Chức vụ
            </Text>
            <Text style={{ margin: themes.Spacing.medium }}>
              {user.role ? convertPosition(user.role) : "Chức vụ"}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.specialInputView}>
            <View>
              <Text
                style={[
                  {
                    color: themes.Colors.dark_gray,
                    marginHorizontal: themes.Spacing.medium,
                  },
                ]}
              >
                Trạng thái
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ margin: themes.Spacing.medium }}>Kích hoạt</Text>
                <Switch
                  value={user.status === "ACTIVE" ? true : false}
                  onValueChange={() => {
                    setUser({
                      ...user,
                      status: !statusEnable ? "ACTIVE" : "IN_ACTIVE",
                    });
                    setStatusEnable(!statusEnable);
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    alignItems: "center",
    marginVertical: themes.Spacing.large,
  },
  imageStyle: {
    width: 90,
    height: 90,
    margin: themes.Spacing.medium,
    borderRadius: 45,
  },
  textImageButton: {
    fontFamily: "Montserrat-Medium",
    fontSize: themes.Text.titleBar,
    color: themes.Colors.primary,
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
    flexDirection: "row",
    alignItems: "center",
  },
  buttonStyle: { width: "85%", alignSelf: "center" },
  linearView: {
    alignItems: "center",
    padding: 13,
    borderRadius: 5,
  },
  buttonLogout: {
    alignItems: "center",
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
  buttonText: { color: themes.Colors.white, fontSize: themes.Text.titleText },
  line: {
    borderBottomWidth: 0.8,
    borderBottomColor: themes.Colors.light_gray,
  },
  specialInputView: {
    marginVertical: themes.Spacing.medium,
  },
});

export default AddEmployee;
