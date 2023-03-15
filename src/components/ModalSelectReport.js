import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import themes from '../themes';


const ModalSelectReport = (props) => {
  const [option, setOption] = useState({
    day: false,
    month: false,
    year: false,
    quarter: false,
  });

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleModalText}>Lựa chọn lọc doanh thu</Text>
          <View style={styles.contentModal}>
            <View style={styles.selectOptionView}>
              <Text style={styles.selectOptionText}>● Báo cáo theo ngày</Text>
              <CheckBox
                disabled={false}
                value={option.day}
                onValueChange={() =>
                  setOption({
                    day: !option.day,
                    month: false,
                    year: false,
                    quarter: false,
                  })
                }
              />
            </View>
            <View style={styles.selectOptionView}>
              <Text style={styles.selectOptionText}>● Báo cáo theo tháng</Text>
              <CheckBox
                value={option.month}
                onValueChange={() =>
                  setOption({
                    day: false,
                    month: !option.month,
                    year: false,
                    quarter: false,
                  })
                }
              />
            </View>
            <View style={styles.selectOptionView}>
              <Text style={styles.selectOptionText}>● Báo cáo theo năm</Text>
              <CheckBox
                value={option.year}
                onValueChange={() =>
                  setOption({
                    day: false,
                    month: false,
                    year: !option.year,
                    quarter: false,
                  })
                }
              />
            </View>
            <View style={styles.selectOptionView}>
              <Text style={styles.selectOptionText}>● Báo cáo theo quý</Text>
              <CheckBox
                value={option.quarter}
                onValueChange={() =>
                  setOption({
                    day: false,
                    month: false,
                    year: false,
                    quarter: !option.quarter,
                  })
                }
              />
            </View>
          </View>
          <View style={styles.buttonFooterView}>
            <TouchableOpacity
              style={styles.buttonFooterStyle}
              onPress={() => props.eventButtonCancel()}>
              <Text style={styles.buttonFooterText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonFooterStyle}
              onPress={() => props.eventButtonConfirm(option)}>
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
    fontStyle: 'italic',
    marginLeft: themes.Spacing.small,
  },
});
export default ModalSelectReport;
