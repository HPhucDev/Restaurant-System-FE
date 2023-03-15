import React from 'react';
import {Modal, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import themes from '../themes';
const ModalNoteOrder = (props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleModalText}>Thêm ghi chú cho đơn hàng</Text>
          <View style={styles.contentModal}>
            <View style={styles.noteView}>
                <Text style={styles.noteText}>Ghi chú cho đơn hàng:</Text>
                <TextInput
                    value={props.value}
                    placeholder="Thêm ghi chú..."
                    style={styles.inputNote}
                    onChangeText={(value) => props.onChangeText(value)}
                />
            </View>
            <View style={styles.buttonFooterView}>
                <TouchableOpacity style={styles.buttonFooterStyle} onPress={() => props.eventButtonCancel()}>
                    <Text style={styles.buttonFooterText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonFooterStyle} onPress={() => props.eventButtonConfirm()}>
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
  }
});
export default ModalNoteOrder;
