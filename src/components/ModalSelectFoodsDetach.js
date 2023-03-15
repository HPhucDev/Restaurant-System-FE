import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import { useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import { getOrderById } from '../api/orderApi';
import themes from '../themes';
import formatCash from '../utils/formatCash';
import CardItemSelectDetach from './CardItemSelectDetach';

const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const ModalSelectFoodsDetach = ({
  visible,
  inToTable,
  fromTable,
  onValueChange,
  eventButtonCancel,
  eventButtonConfirm,
  idOrder,
  eventButton
}) => {
  const [isRefresh, setRefresh] = useState(false);
  const [foodsOrder, setFoodsOrder] = useState([]);

    useEffect(() => {
        loadDataFoods();
      }, []);
    
      const loadDataFoods = async () => {
        if (idOrder !== 0) {
          setRefresh(true);
          await getOrderById({
            id: idOrder,
          })
            .then((response) => {
              let foodsRemoveCancel = [];
              response.data.orderDetailModels.map((item)=>{
                if(item.status !== 'REFUSE'){
                  foodsRemoveCancel.push(item);
                }
              })
              setRefresh(false);
              setFoodsOrder([...foodsRemoveCancel]);
            })
            .catch((error) => {
              setRefresh(false);
              console.log(error);
            });
        }
      };
      
      const renderEmp = () =>{
        return(
          <Text style={{alignSelf: 'center'}}>Không có món</Text>
        )
      }
  return (
        <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleModalText}>
              Chọn món ăn/số lượng cần tách{' '}
            </Text>
            <View style={styles.contentModal}>
              <Text style={styles.titleListFoodText}>Danh sách món ăn</Text>
              <FlatList
                style={{height: 200, marginTop: themes.Spacing.medium}}
                data={foodsOrder}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <CardItemSelectDetach
                    urlImages={item.foodItemModel.urlImages}
                    nameFood={item.foodItemModel.name}
                    price={formatCash(item.foodItemModel.price + '')}
                    numberItem={item.quantity}
                    eventButton={() => eventButton(item)}
                  />
                )}
                ListEmptyComponent={renderEmp}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefresh}
                    onRefresh={() => {
                      loadDataFoods();
                    }}
                  />
                }
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
    marginBottom: themes.Spacing.medium
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
    justifyContent: 'space-between',
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
  titleListFoodText: {
    marginHorizontal: themes.Spacing.large,
    fontSize: themes.Text.titleText,
    alignSelf: 'center',
  },
});
export default ModalSelectFoodsDetach;
