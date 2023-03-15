import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import SpinnerCustom from '../../../components/Spinner';
import StatusBarCustom from '../../../components/StatusBarCustom';
import {TitleBar, TitleBarRemove} from '../../../components/TitleBar';
import ImageView from 'react-native-image-viewing';
import themes from '../../../themes';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelectFoodType from '../../../components/ModalSelectFoodType';
import ImagePicker from 'react-native-image-crop-picker';
import ButtonSave from '../../../components/ButtonSave';
import {
  addFood,
  getFoodItemByIdApi,
  updateFoodById,
} from '../../../api/foodApi';
import uuid from 'react-native-uuid';
import convertNameFoodType from '../../../utils/convertNameFoodType';

const AddFoodItem = (props) => {
  const option = props.route.params.option;
  const idFood = props.route.params.idFood;

  const [loading, setLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const [food, setFood] = useState({
    name: '',
    description: '',
    price: 0,
    status: 'ISACTIVE',
    typeName: '',
    idRestaurant: 1,
    urlImages: '',
    discount: 0,
  });

  useEffect(() => {
    if (option === 'EDIT') {
      setLoading(true);
      getFoodItemByIdApi({
        id: idFood,
      })
        .then((response) => {
          setLoading(false);
          setFood(response.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
        });
    }
  }, []);

  const openLib = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setFood({
          ...food,
          urlImages: image.path,
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
        setFood({
          ...food,
          urlImages: image.path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validInput = () => {
    if (!food.urlImages) {
      Alert.alert('Thông báo', 'Vui lòng chọn hình ảnh');
      return false;
    } else if (!food.name) {
      Alert.alert('Thông báo', 'Tên món ăn không được để rỗng');
      return false;
    } else if (food.price === 0) {
      Alert.alert('Thông báo', 'Nhập giá món ăn');
      return false;
    } else if (!food.typeName) {
      Alert.alert('Thông báo', 'Vui lòng chọn loại món');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validInput()) {
      setLoading(true);
      const formData = new FormData();
      formData.append('foodItemDTO', JSON.stringify(food));
      formData.append('images', {
        uri: food.urlImages,
        type: 'image/jpeg',
        name: uuid.v4() + '.jpg',
      });

      if (option === 'EDIT') {
        await updateFoodById({
          formData: formData,
          id: idFood,
        })
          .then((response) => {
            setLoading(false);
            Alert.alert('Thông báo', 'Cập nhật thông tin thành công!.');
            props.navigation.navigate('listFoodItem');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            Alert.alert('Thông báo', 'Có lỗi khi cập nhật.');
          });
      } else {
        await addFood({
          formData: formData,
        })
          .then((response) => {
            setLoading(false);
            console.log(response.data);
            Alert.alert('Thông báo', 'Thêm thành công.');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error.response);
            Alert.alert('Thông báo', 'Có lỗi khi thêm món ăn.');
          });
      }
    }
  };

  const removeFood = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('foodItemDTO', JSON.stringify({status: 'NOACTIVE'}));
    await updateFoodById({
      formData: formData,
      id: idFood,
    })
      .then((response) => {
        setLoading(false);
        Alert.alert('Thông báo', 'Xóa món thành công!.');
        props.navigation.navigate('listFoodItem');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Alert.alert('Thông báo', 'Có lỗi khi xóa.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalSelectFoodType
        visible={visibleModal}
        eventButtonConfirm={() => setVisibleModal(false)}
        eventButtonCancel={() => setVisibleModal(false)}
        value={(value) => {
          setFood({
            ...food,
            typeName: value.name,
          });
        }}
      />

      {option === 'EDIT' ? (
        <TitleBar
          name="Chỉnh sửa thông tin món"
          eventButton={() => props.navigation.goBack()}
        />
      ) : (
        <TitleBar
          name="Thêm món ăn"
          eventButton={() => props.navigation.goBack()}
        />
      )}

      <StatusBarCustom />
      <SpinnerCustom isVisible={loading} />
      <ScrollView>
        <View style={styles.imageView}>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <ImageView
              images={[
                {
                  uri: food.urlImages,
                },
              ]}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
            <Image
              source={
                food.urlImages
                  ? {
                      uri: food.urlImages,
                    }
                  : require('../../../assets/images/food-empty.jpg')
              }
              style={styles.imageStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Thông báo', 'Tải lên hình ảnh của bạn bằng', [
                {
                  text: 'Camera',
                  onPress: () => openCamera(),
                },
                {
                  text: 'Thư viện',
                  onPress: () => openLib(),
                },
              ]);
            }}>
            <Text style={styles.textImageButton}>Chọn ảnh món ăn</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView style={styles.inputView}>
          <TextInput
            label="Tên món ăn*"
            style={styles.inputStyle}
            theme={{colors: {primary: themes.Colors.primary}}}
            value={food.name}
            onChangeText={(value) =>
              setFood({
                ...food,
                name: value,
              })
            }
          />
          <TextInput
            label="Mô tả món ăn"
            style={styles.inputStyle}
            theme={{colors: {primary: themes.Colors.primary}}}
            value={food.description}
            onChangeText={(value) =>
              setFood({
                ...food,
                description: value,
              })
            }
          />
          <TextInput
            label="Giá tiền*"
            style={styles.inputStyle}
            theme={{colors: {primary: themes.Colors.primary}}}
            keyboardType="number-pad"
            value={food.price.toString()}
            onChangeText={(value) => {
              setFood({
                ...food,
                price: value ? parseFloat(value) : 0,
              });
            }}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setVisibleModal(true)}>
            <Text style={styles.textStyle}>
              {food.typeName
                ? convertNameFoodType(food.typeName)
                : 'Chọn loại món'}
            </Text>
            <Icon name="chevron-down" size={15} />
          </TouchableOpacity>
          <View style={styles.line} />
          <View style={styles.specialInputView}>
            <View>
              <Text
                style={[
                  {
                    color: themes.Colors.dark_gray,
                    marginHorizontal: themes.Spacing.medium,
                  },
                ]}>
                Trạng thái
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{margin: themes.Spacing.medium}}>Kích hoạt</Text>
                <Switch
                  value={food.status === 'ISACTIVE' ? true : false}
                  onValueChange={() => {
                    setFood({
                      ...food,
                      status:
                        food.status === 'ISACTIVE' ? 'NOACTIVE' : 'ISACTIVE',
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <ButtonSave name="Lưu" eventButton={() => handleSubmit()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  imageView: {
    alignItems: 'center',
    marginVertical: themes.Spacing.large,
  },
  imageStyle: {
    width: 100,
    height: 100,
    margin: themes.Spacing.medium,
    borderRadius: 50,
  },
  textImageButton: {
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
  line: {
    borderBottomWidth: 0.8,
    borderBottomColor: themes.Colors.dark_gray,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: themes.Spacing.large,
  },
  textStyle: {
    marginHorizontal: themes.Spacing.medium,
  },
  specialInputView: {
    marginVertical: themes.Spacing.medium,
    paddingBottom: 100,
  },
});
export default AddFoodItem;
