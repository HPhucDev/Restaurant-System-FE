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
import {createOrderApi, getStatusTableByOrder, orderMergeTableNotNull, orderMergeTableNull} from '../../api/orderApi';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import convertStatusTable from '../../utils/convertStatusTable';
import LinearGradient from 'react-native-linear-gradient';
import convertNameTable from '../../utils/convertNameTable';
import CheckBox from '@react-native-community/checkbox';
import listTable from '../../store/table';
import ModalSelectGroupTable from '../../components/ModalSelectGroupTable';
import SpinnerCustom from '../../components/Spinner';

const PairingTable = (props) => {
  const [tables, setTables] = useState();
  const [isRefresh, setRefresh] = useState(false);
  const [tableSelect, setTableSelect] = useState([]);
  const tableName = props.route.params.tableName;
  const idOrder = props.route.params.idOrder;
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [valueSelect, setValueSelect] = useState({
    groupAll: false,
    groupTable: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const convertFromTable = (tableSelect) => {
    const fromTables = [];
    if (tableSelect.length > 0) {
      tableSelect.map((item) => {
        if (item.isCheck) {
          fromTables.push(item.id);
        }
      });
    }
    return fromTables;
  };

  const setListTableSelect = (table) => {
    let isAdd = false;
    if (table.isCheck) {
      if (tableSelect.length > 0) {
        for (let i = 0; i < tableSelect.length; i++) {
          if (tableSelect[i].id === table.id) {
            isAdd = false;
            return;
          } else {
            isAdd = true;
          }
        }
        if (isAdd) {
          setTableSelect([...tableSelect, table]);
        }
      } else {
        setTableSelect([...tableSelect, table]);
      }
    } else {
      let removeTables = tableSelect.filter((item) => item.id !== table.id);
      setTableSelect([...removeTables]);
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
      (item) => item.tableName !== tableName,
    );
    tablesRemoveDefault = listTable.filter(
      (item) => item.status !== 'MERGE',
    );
    setTables([...tablesRemoveDefault]);
  };

  const pairingTableNotNull = async (orderList, orderRoot, emptyTable ) =>{
    setLoading(true);
    if(emptyTable.length > 0){
      emptyTable.map(async (item)=>{
        await createOrderApi({
          idUser: props.user.userId,
          tableName: item.tableName,
          // note: params.note,
        })
        .then((response) =>{
          mergeTableNotNull(
            [{
              id: response.data.id,
            }],
            orderRoot
          )
        })
        .catch((error)=>{
          console.log(error);
          Alert.alert('Thông báo', 'Có lỗi khi chuyển bàn.');
          return;
        });
      });
    }
    if(orderList.length > 0){
      mergeTableNotNull(
        orderList,
        orderRoot
      )
    }
  };

  const mergeTableNotNull = async(orderList,orderRoot) =>{
    await orderMergeTableNotNull({
        orderList: orderList,
        orderRoot: orderRoot
      })
      .then((response) =>{
        setLoading(false);
        Alert.alert("Thông báo", "Đã gộp bàn thành công!", [
          {
            text: 'Xác nhận',
            onPress: () => {
              setVisibleModal(false)
              props.navigation.goBack();
            },
          },
        ]);
      })
      .catch((error)=>{
        setLoading(false);
        Alert.alert("Thông báo", "Có lỗi trong khi gộp bàn. \n Vui lòng thử lại.");
        console.log(error)
      })
  }

  const pairingTableNull = async (orderList, orderRoot, emptyTable ) =>{
    setLoading(true);
    await orderMergeTableNull({
      orderList: orderList,
      orderRoot: orderRoot
    })
    .then((response) =>{
      setLoading(false);
      Alert.alert("Thông báo", "Đã gộp bàn thành công!", [
        {
          text: 'Xác nhận',
          onPress: () => {
            setVisibleModal(false);
            props.navigation.goBack();
          },
        },
      ]);
    })
    .catch((error)=>{
      setLoading(false);
      Alert.alert("Thông báo", "Có lỗi trong khi gộp bàn. \n Vui lòng thử lại.");
      console.log(error.response)
    })
  };

  const confirmPairingTable = async () => {
    if (!valueSelect.groupAll && !valueSelect.groupTable) {
      Alert.alert('Thông báo', 'Vui lòng chọn phương thức chuyển bàn.');
      return;
    }
    else if(valueSelect.groupAll){
      let orderList = [];
      let orderRoot = {
        id: idOrder,
      };

      tableSelect.map((item)=>{
        if(item.status !== ''){
          orderList.push({
            id: item.idOrder,
          });
        }
        ///
      });
      if(orderList.length > 0){
         await pairingTableNull(orderList, orderRoot);
      }
      else{
        Alert.alert("Thông báo", "Vui lòng chọn bàn đã order");
      }
    }
    else if(valueSelect.groupTable){
      let orderList = [];
      let orderRoot = {
        id: idOrder,
      };
      let emptyTable = [];

      tableSelect.map((item)=>{
        if(item.status !== ''){
          orderList.push({
            id: item.idOrder,
          });
        }
        else if(item.status === ''){
          emptyTable.push(item);
        }
        ///
      });

      await pairingTableNotNull(orderList, orderRoot, emptyTable);
    }
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
          <Text style={styles.buttonCheckOutText}>Xác nhận ghép bàn</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
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
          onValueChange={() => onValueChange(idOrder, tableName, !isClick)}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
       <SpinnerCustom isVisible={loading} />
      <ModalSelectGroupTable
        visible={visibleModal}
        eventButtonCancel={() => {
          setVisibleModal(false);
        }}
        onValueChange={(value) => {
          setValueSelect(value);
        }}
        eventButtonConfirm={() => confirmPairingTable()}
        fromTable={convertFromTable(tableSelect)}
        inToTable={tableName.substr(tableName.length - 1)}
      />
      <View style={styles.contentView}>
        <TitleInvoice
          title="Ghép bàn"
          eventGoBack={() => props.navigation.goBack()}
        />
        <Text style={styles.titleText}>Chọn bàn muốn ghép</Text>
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
                tables[index] = {
                  ...tables[index],
                  isCheck: isClick,
                };
                setTables([...tables]);
                // setTableSelect([...tableSelect, tables[index]]);
                setListTableSelect(tables[index]);
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
          if (tableSelect.length > 0) {
            setVisibleModal(true);
          } else {
            Alert.alert('Thông báo', 'Chưa chọn bàn cần ghép.');
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

export default connect(mapStateToProps, actions)(PairingTable);
