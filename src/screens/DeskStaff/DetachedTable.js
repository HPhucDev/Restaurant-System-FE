import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TitleInvoice from '../../components/TitleInvoice';
import themes from '../../themes';
import {
  createOrderApi,
  createOrderDetailApi,
  getStatusTableByOrder,
} from '../../api/orderApi';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import convertStatusTable from '../../utils/convertStatusTable';
import LinearGradient from 'react-native-linear-gradient';
import convertNameTable from '../../utils/convertNameTable';
import CheckBox from '@react-native-community/checkbox';
import listTable from '../../store/table';
import ModalSelectGroupTable from '../../components/ModalSelectGroupTable';
import ModalSelectDetachedTable from '../../components/ModalSelectDetachedTable';
import ModalSelectFoodsDetach from '../../components/ModalSelectFoodsDetach';
import ModalSelectNumberDetach from '../../components/ModalSelectNumberDetach';
import {
  deleteOrderDetailApi,
  updateQuantityOrderDetailApi,
  updateStatusOrderDetailApi,
} from '../../api/orderDetailApi';
import SpinnerCustom from '../../components/Spinner';

const DetachedTable = (props) => {
  const [tables, setTables] = useState();
  const [listTableRemoveDefault, setListTableRemoveDefault] = useState();
  const [isRefresh, setRefresh] = useState(false);
  const [tableSelect, setTableSelect] = useState(null);
  const tableName = props.route.params.tableName;
  const idOrder = props.route.params.idOrder;
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleSelectFood, setVisibleSelectFood] = useState(false);
  const [visibleSelectNumber, setVisibleSelectNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberFood, setNumberFood] = useState(0);
  const [foodSelect, setFoodSelect] = useState();

  const [valueSelect, setValueSelect] = useState({
    groupAll: false,
    payAll: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const setListTableSelect = (table) => {
    if (table.isCheck) {
      setTableSelect(table);
    } else {
      setTableSelect(null);
    }
  };

  const setDataTable = (list) => {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < listTable.length; j++) {
        if (list[i].tableName === listTable[j].tableName) {
          listTable[j] = {
            ...listTable[j],
            idOrder: list[i].id,
            status: list[i].orderStatus[0].status,
            quantity: list[i].orderDetailModels.length,
          };
        }
      }
    }
    let tablesRemoveDefault = listTable.filter(
      (item) => item.status !== 'MERGE',
    );
    tablesRemoveDefault = tablesRemoveDefault.filter(
      (item) => item.tableName !== tableName,
    );
    setTables([...tablesRemoveDefault]);
    setListTableRemoveDefault([...tablesRemoveDefault]);
  };

  const confirmPairingTable = () => {
    if (!valueSelect.groupAll && !valueSelect.payAll) {
      Alert.alert('Thông báo', 'Vui lòng chọn phương thức chuyển bàn.');
    }
    console.log(tableSelect);
  };

  const loadData = async () => {
    setRefresh(true);
    await getStatusTableByOrder()
      .then((response) => {
        props.loadOrders(response.data);
        setTables(response.data);
        setDataTable(response.data);
        setRefresh(false);
      })
      .catch((error) => {
        setRefresh(false);
        console.log(error);
      });
  };

  const updateQuantityOrderDetail = async (id, quantity, idOrder) => {
    setLoading(true);
    let quantityRemove = foodSelect.quantity - quantity;
    await updateQuantityOrderDetailApi({
      id: id,
      quantity: quantityRemove,
    })
      .then((response) => {
        console.log(response.data);
        createOrderDetailApi({
          idOrder: idOrder,
          idFoodItem: foodSelect.idFoodItem,
          quantity: quantity,
          note: foodSelect.note,
          status: foodSelect.status,
        })
          .then((response) => {
            setLoading(false);
            Alert.alert('Thông báo', 'Tách món thành công!');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error.response);
            Alert.alert('Thông báo', 'Tách món thất bại!');
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        Alert.alert('Thông báo', 'Lỗi khi tách món!');
      });
  };

  const handleSubmit = (quantity) => {
    if (tableSelect.idOrder !== 0) {
      if (foodSelect.quantity == quantity) {
        setLoading(true);
        deleteOrderDetailApi({
          id: foodSelect.id,
        })
          .then((response) => {
            createOrderDetailApi({
              idOrder: tableSelect.idOrder,
              idFoodItem: foodSelect.idFoodItem,
              quantity: quantity,
              note: foodSelect.note,
              status: foodSelect.status,
            })
              .then((response) => {
                setLoading(false);
                setVisibleSelectNumber(false);
                setVisibleSelectFood(false);
                setVisibleModal(false);
                Alert.alert('Thông báo', 'Tách món thành công!');
              })
              .catch((error) => {
                setLoading(false);
                console.log(error.response);
                Alert.alert('Thông báo', 'Tách món thất bại!');
              });
          })
          .catch((error) => {
            setLoading(false);
            console.log(error.response);
            Alert.alert('Thông báo', 'Tách món thất bại!');
          });
      } else {
        updateQuantityOrderDetail(foodSelect.id, quantity, tableSelect.idOrder);
      }
    } else {
      setLoading(true);
      createOrderApi({
        idUser: props.user.userId,
        tableName: tableSelect.tableName,
        // note: params.note,
      })
        .then((response) => {
          let idOrderRes = response.data.id;
          if (foodSelect.quantity == quantity) {
            deleteOrderDetailApi({
              id: foodSelect.id,
            })
              .then((response) => {
                createOrderDetailApi({
                  idOrder: idOrderRes,
                  idFoodItem: foodSelect.idFoodItem,
                  quantity: quantity,
                  note: foodSelect.note,
                  status: foodSelect.status,
                })
                  .then((response) => {
                    setLoading(false);
                    setVisibleSelectNumber(false);
                    setVisibleSelectFood(false);
                    setVisibleModal(false);
                    Alert.alert('Thông báo', 'Tách món thành công!');
                  })
                  .catch((error) => {
                    setLoading(false);
                    console.log(error.response);
                    Alert.alert('Thông báo', 'Tách món thất bại!');
                  });
              })
              .catch((error) => {
                setLoading(false);
                console.log(error.response);
                Alert.alert('Thông báo', 'Tách món thất bại!');
              });
          } else {
            updateQuantityOrderDetail(foodSelect.id, quantity, idOrderRes);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
          Alert.alert('Thông báo', 'Có lỗi khi tách món!');
        });
    }
  };

  const ButtonCheckOut = ({eventButton}) => {
    return (
      <TouchableOpacity style={styles.buttonCheckOutView} onPress={eventButton}>
        <LinearGradient
          style={{
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[themes.Colors.start, themes.Colors.end]}>
          <Text style={styles.buttonCheckOutText}>Xác nhận tách bàn</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const convertFromTable = () => {
    if (tableSelect) {
      return tableSelect.tableName.substr(tableSelect.tableName.length - 2);
    }
  };

  const BillItem = ({
    tableName,
    idOrder,
    quantity,
    status,
    eventButton,
    isClick,
    onValueChange,
  }) => {
    return (
      <TouchableOpacity style={styles.billView} onPress={eventButton}>
        <View style={styles.tableView}>
          <Text style={styles.tableText}>{convertNameTable(tableName)}</Text>
        </View>
        <View style={styles.contentText}>
          <Text style={styles.textStyle}>Mã hóa đơn: #{idOrder}</Text>
          <Text style={[styles.textStyle, styles.priceText]}>
            Tổng món: {quantity}
          </Text>
          <Text
            style={[
              styles.textStyle,
              styles.statusText,
              status === ''
                ? {color: themes.Colors.done}
                : {color: themes.Colors.danger},
            ]}>
            Trạng thái: {convertStatusTable(status)}
          </Text>
        </View>
        <CheckBox
          style={styles.iconStarStyle}
          disabled={false}
          value={isClick}
          onCheckColor={themes.Colors.done}
          onValueChange={() => {
            onValueChange(idOrder, tableName, !isClick);
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <SpinnerCustom isVisible={loading} />

      <ModalSelectNumberDetach
        visible={visibleSelectNumber}
        onChangeText={(value) => {
          setNumberFood(value);
        }}
        food={foodSelect}
        eventButtonCancel={() => setVisibleSelectNumber(false)}
        eventButtonConfirm={(value) => handleSubmit(value)}
      />
      <ModalSelectFoodsDetach
        idOrder={idOrder}
        eventButtonCancel={() => {
          setVisibleSelectFood(false);
          setVisibleModal(true);
        }}
        visible={visibleSelectFood}
        eventButton={(value) => {
          {
            setFoodSelect(value);
            setVisibleSelectNumber(true);
          }
        }}
      />

      <ModalSelectDetachedTable
        visible={visibleModal}
        eventButtonCancel={() => {
          setVisibleModal(false);
        }}
        onValueChange={(value) => {
          setValueSelect(value);
        }}
        eventButtonConfirm={() => confirmPairingTable()}
        eventButtonSelectFood={() => setVisibleSelectFood(true)}
        fromTable={convertFromTable()}
        inToTable={tableName.substr(tableName.length - 2)}
      />
      <View style={styles.contentView}>
        <TitleInvoice
          title="Tách bàn"
          eventGoBack={() => props.navigation.goBack()}
        />
        <Text style={styles.titleText}>Chọn bàn muốn tách</Text>
        <FlatList
          nestedScrollEnabled={true}
          data={tables}
          style={{height: '75%'}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <BillItem
              tableName={item.tableName}
              idOrder={item.idOrder}
              quantity={item.quantity}
              status={item.status}
              eventButton={() => {}}
              isClick={item.isCheck}
              onValueChange={(idOrder, tableName, isClick) => {
                let array = [];
                array = [...listTableRemoveDefault];
                array[index] = {
                  ...array[index],
                  isCheck: isClick,
                };
                setTables([...array]);
                setListTableSelect(array[index]);
              }}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                loadData();
              }}
            />
          }
        />
      </View>
      <ButtonCheckOut
        eventButton={() => {
          if (tableSelect !== null) {
            setVisibleModal(true);
          } else {
            Alert.alert('Thông báo', 'Chưa chọn bàn cần tách.');
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  contentView: {},
  titleText: {
    color: themes.Colors.black,
    alignSelf: 'center',
    fontSize: themes.Text.titleBar,
    marginVertical: themes.Spacing.large,
  },
  buttonCheckOutView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  buttonCheckOutText: {
    color: themes.Colors.white,
    fontSize: themes.Text.titleBar,
    paddingVertical: themes.Spacing.large,
  },

  //
  billView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    borderRadius: 10,
    elevation: 5,
  },
  tableView: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: themes.Colors.primary,
  },
  tableText: {
    fontSize: themes.Text.titleText,
  },
  contentText: {
    marginHorizontal: themes.Spacing.medium,
  },
  textStyle: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.lable_text,
  },
  statusText: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginTop: themes.Spacing.large,
    // color: themes.Colors.done,
  },
  iconStarStyle: {
    position: 'absolute',
    right: themes.Spacing.medium,
    alignSelf: 'center',
    color: themes.Colors.primary,
  },
});

const mapStateToProps = (state) => ({
  foods: state.foods,
  user: state.user,
  orders: state.orders,
});

export default connect(mapStateToProps, actions)(DetachedTable);
