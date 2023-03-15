import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import themes from '../themes';
import Entypo from 'react-native-vector-icons/Entypo';

const ModalSelectDetachedTable = ({
  visible,
  inToTable,
  fromTable,
  eventButtonCancel,
  eventButtonConfirm,
  eventButtonSelectFood,
}) => {

  const convertFromTable = (fromTable) => {
    let value = '';
    if (fromTable.length > 0) {
      fromTable.map((item) => {
        value += item + ',';
      });
    }
    return value.substring(0, value.length - 1);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleModalText}>Xác nhận tách bàn</Text>
          <View style={styles.contentModal}>
            <View style={styles.noteView}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.noteText}>Tách bàn </Text>
                <Text style={[styles.noteText, {fontWeight: 'bold'}]}>
                  {inToTable}
                </Text>
                <Text style={styles.noteText}> đến bàn </Text>
                <Text style={[styles.noteText, {fontWeight: 'bold'}]}>
                  số {fromTable}
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <TouchableOpacity style={styles.optionText} onPress={()=> eventButtonSelectFood()}>
                  <Text>Chọn món ăn cần tách</Text>
                  <Entypo name="chevron-down" size={25} />
                </TouchableOpacity>
              </View>
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
    marginVertical: themes.Spacing.medium,
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
    paddingVertical: themes.Spacing.large,
  },
  noteText: {
    fontSize: themes.Text.titleText,
  },
  optionText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: themes.Text.dateText,
    color: themes.Colors.danger,
    paddingVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    borderRadius: 5,
    borderWidth: 0.5,
    marginHorizontal: themes.Spacing.small,
    paddingHorizontal: themes.Spacing.medium,
  },
  inputNote: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.dark_gray,
    fontStyle: 'italic',
  },
  buttonFooterView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    justifyContent: 'space-between'
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
  //
  selectOptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectOptionText: {
    fontStyle: 'italic',
    marginLeft: themes.Spacing.small,
  },
});
export default ModalSelectDetachedTable;
