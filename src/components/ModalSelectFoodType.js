import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import themes from '../themes';
import CheckBox from '@react-native-community/checkbox';
import convertNameFoodType from '../utils/convertNameFoodType';
import { getAllFoodType } from '../api/foodApi';

const ModalSelectFoodType = ({
  visible,
  eventButtonCancel,
  eventButtonConfirm,
  value,
}) => {
  const [type, setType] = useState([]);
  const [typeCheck, setTypeCheck] = useState([]);

  const loadFoodType = async () => {
    await getAllFoodType()
      .then((response) => {
        if (response.data.length > 0) {
            let typeArr = [];
            response.data.map((item) => {
              typeArr.push({
                  id: item.id,
                  name: item.name,
                  isCheck: false,
              })
            });
            setType([...typeArr]);
            setTypeCheck([...typeArr]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
     loadFoodType();
  }, []);

  const onChangeCheck = (index, isCheck) => {
    let arrType = [] 
    arrType = [...typeCheck];
    arrType[index] = {
        ...arrType[index],
        isCheck: isCheck,
    }
    setType([...arrType])
    value(arrType[index]);
  }

  const ItemFoodType = ({name, isCheck, index}) => {
    return (
      <View style={styles.selectOptionView}>
        <Text style={styles.selectOptionText}>
          ● {convertNameFoodType(name)}
        </Text>
        <CheckBox disabled={false} value={isCheck} onValueChange={() => 
            onChangeCheck(index, !isCheck)} />
      </View>
    );
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleModalText}>Chọn loại món</Text>
          <View style={styles.contentModal}>
            <View style={styles.noteView}>
              <Text style={styles.noteText}>Vui lòng chọn loại món:</Text>
              <FlatList
                data={type}
                renderItem={({item, index}) => (
                  <ItemFoodType name={item.name} isCheck={item.isCheck} index={index}/>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={styles.buttonFooterView}>
              <TouchableOpacity
                style={styles.buttonFooterStyle}
                onPress={() => eventButtonCancel()}>
                <Text style={styles.buttonFooterText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonFooterStyle}
                onPress={() => eventButtonConfirm()}>
                <Text style={styles.buttonFooterText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  modalView: {
    margin: themes.Spacing.extra_large,
    padding: themes.Spacing.medium,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  titleModalText: {
    fontSize: themes.Text.titleBar,
    alignSelf: 'center',
    color: themes.Colors.dark_grown,
    fontWeight: '800',
  },
  contentModal: {
    marginVertical: themes.Spacing.large,
  },
  infoPrice: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginTop: themes.Spacing.small,
    alignItems: 'center',
  },
  sumFoodItemText: {
    fontSize: themes.Text.titleText,
  },
  sumFoodItem: {
    fontSize: themes.Text.titleText,
    position: 'absolute',
    right: themes.Spacing.medium,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  editNumber: {
    position: 'absolute',
    right: themes.Spacing.small,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: themes.Spacing.small,
  },
  numberText: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.black,
  },
  noteView: {
    marginHorizontal: themes.Spacing.medium,
    marginVertical: themes.Spacing.medium,
  },
  noteText: {
    fontSize: themes.Text.titleText,
  },
  inputNote: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.dark_gray,
    fontStyle: 'italic',
  },
  buttonFooterView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.large,
  },
  buttonFooterStyle: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: themes.Colors.primary,
    marginRight: themes.Spacing.medium,
    borderRadius: 5,
  },
  buttonFooterText: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.white,
    padding: themes.Spacing.medium,
  },
  selectOptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectOptionText: {
    marginLeft: themes.Spacing.small,
  },
});
export default ModalSelectFoodType;
