import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { useState } from 'react';
import {Modal, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import themes from '../themes';
const ModalSelectRole = (props) => {

    const [role, setRole] = useState({
        desk: false,
        cashier: false,
        kitchen: false,
        management: false,
    });

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleModalText}>Chọn chức vụ</Text>
          <View style={styles.contentModal}>
                <View style={styles.selectOptionView}>
                    <Text style={styles.selectOptionText}>● Nhân viên bàn</Text>
                    <CheckBox
                        disabled={false}
                        value={role.desk}
                        onValueChange={()=> setRole({
                            desk: !role.desk,
                            cashier: false,
                            kitchen: false,
                            management: false,
                        })}
                    />
                </View>
                <View style={styles.selectOptionView}>
                    <Text style={styles.selectOptionText}>● Nhân viên thu ngân</Text>
                    <CheckBox
                        value={role.cashier}
                        onValueChange={()=> setRole({
                            desk: false,
                            cashier: !role.cashier,
                            kitchen: false,
                            management: false
                        })}
                    />
                </View>
                <View style={styles.selectOptionView}>
                    <Text style={styles.selectOptionText}>● Nhân viên bếp</Text>
                    <CheckBox
                        value={role.kitchen}
                        onValueChange={()=> setRole({
                            desk: false,
                            cashier: false,
                            kitchen: !role.kitchen,
                            management: false
                        })}
                    />
                </View>
                <View style={styles.selectOptionView}>
                    <Text style={styles.selectOptionText}>● Nhân viên quản lý</Text>
                    <CheckBox
                        value={role.management}
                        onValueChange={()=> setRole({
                            desk: false,
                            cashier: false,
                            kitchen: false,
                            management: !role.management
                        })}
                    />
                </View>
            </View>
            <View style={styles.buttonFooterView}>
                <TouchableOpacity style={styles.buttonFooterStyle} onPress={() => props.eventButtonCancel()}>
                    <Text style={styles.buttonFooterText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFooterStyle} onPress={() => props.eventButtonConfirm(role)}>
                    <Text style={styles.buttonFooterText}>Xác nhận</Text>
                </TouchableOpacity>
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
  contentModal:{
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
  editNumber:{
    position: 'absolute',
    right: themes.Spacing.small,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    bottom: themes.Spacing.small
  },
  numberText:{
    fontSize: themes.Text.titleText,
    color: themes.Colors.black,
  },
  noteView:{
      marginHorizontal: themes.Spacing.medium,
      marginVertical: themes.Spacing.medium,
  },
  noteText:{
      fontSize: themes.Text.titleText
  },
  inputNote:{
      fontSize: themes.Text.titleText,
      color: themes.Colors.dark_gray,
      fontStyle: 'italic',
  },
  buttonFooterView:{
      flexDirection: 'row',
      marginHorizontal: themes.Spacing.large,
  },
  buttonFooterStyle:{
    width: '50%',
    alignItems:'center',
    backgroundColor: themes.Colors.primary,
    marginRight: themes.Spacing.medium,
    borderRadius: 5
  },
  buttonFooterText:{
    fontSize: themes.Text.titleText,
    color: themes.Colors.white,
    padding: themes.Spacing.medium
  },
  selectOptionView:{
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  selectOptionText:{
    fontStyle: 'italic', marginLeft: themes.Spacing.small
  }
});
export default ModalSelectRole;
