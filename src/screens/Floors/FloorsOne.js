import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import {getStatusTableByOrder} from '../../api/orderApi';
import themes from '../../themes';
import convertStatusTable from '../../utils/convertStatusTable';
import {useIsFocused} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import convertNameTable from '../../utils/convertNameTable';

const backgroundTable = [themes.Colors.white, themes.Colors.light];

const FloorsOne = (props) => {
  const [isRefresh, setRefresh] = useState(false);
  const [background, setBackgroud] = useState(themes.Colors.light);
  const [isReload, setIsReload] = useState(true);
  const arrr = useSelector(state => state.orders);
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([
    {
      name: 'Bàn 1',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_1',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 2',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_2',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 3',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_3',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 4',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_4',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 5',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_5',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 6',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_6',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 7',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_7',
      idOrder: 0,
      groupTable: false,
    },
    {
      name: 'Bàn 8',
      status: 'Còn trống',
      type: 1,
      tableName: 'TABLE_8',
      idOrder: 0,
      groupTable: false,
    },
  ]);

  const convertBackgroundTable = (status) => {
    switch (status) {
      case 'NEW':
        return 2;
      case 'WAIT_KICHEN':
        return 2;
      case 'MERGE':
        return 3;
      case 'UPFOOD':
        return 4;
      case 'ENOIGHFOOD':
        return 5;
      default:
        return 1;
    }
  };

  const setDefaultValueTable = () => {
    for (let j = 0; j < items.length; j++) {
      items[j] = {
        ...items[j],
        status: 'Còn trống',
        type: 1,
        idOrder: 0,
      };
      setItems([...items]);
    }
  };

  const findTableJoin = (orderPairings) =>{
    if(orderPairings.length > 0 ){
      return orderPairings[0].tableNameJoin;
    }
  };

  const setDataTable = (list) => {
    setDefaultValueTable();
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < items.length; j++) {
        if (list[i].tableName === items[j].tableName) {
          let tableGroup = '';
          let groupTable = false;
          if(list[i].orderStatus[0].status === 'MERGE'){
            tableGroup = findTableJoin(list[i].orderPairingModels);
            groupTable = true;
          }
          items[j] = {
            ...items[j],
            groupTable: groupTable,
            status: convertStatusTable(list[i].orderStatus[0].status) + ' ' + convertNameTable(tableGroup),
            type: convertBackgroundTable(list[i].orderStatus[0].status),
            idOrder: list[i].id,
          };
          setItems([...items]);
        }
      }
    }
  };
  const setBackgroudTable = () => {
    let index = 0;
    setInterval(() => {
      if(index === 2){
        index = 0;
      }
      setBackgroud(backgroundTable[index++])
    }, 300);
  };

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     loadData();
  //   }, 4000);
  //   return () => {
  //     setDataTable([]);
  //     clearInterval(interval);
  //   };
  // }, [])

  useFocusEffect(
    useCallback(() => {
      setDataTable(props.orders);
      let interval = setInterval(() => {
        loadData();
      }, 2000);
      return () => {
        setDataTable([]);
        clearInterval(interval);
      };
    }, [props.orders]),
  );

  const loadData = async () => {
    await getStatusTableByOrder()
      .then((response) => {
        setRefresh(false);
        props.loadOrders(response.data);
        setDataTable(response.data);
      })
      .catch((error) => {
        setRefresh(false);
        console.log(error);
      });
  };

  const TableEmpty = (props) => {
    return (
      <TouchableOpacity
        style={styles.tableEmptyStyle}
        onPress={() => props.eventButton()}>
        <Image
          source={require('../../assets/images/icon-table.png')}
          style={styles.iconTableEmpty}
        />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemStatus}>{props.status}</Text>
      </TouchableOpacity>
    );
  };

  const TableAwaitKitchen = (props) => {
    return (
      <TouchableOpacity
        style={[styles.tableKitchenStyle, {backgroundColor: background}]}
        onPress={() => props.eventButton()}>
        <Image
          source={require('../../assets/images/icon-table.png')}
          style={styles.iconTableAwaitKitchen}
        />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemStatus}>{props.status}</Text>
      </TouchableOpacity>
    );
  };

  const TableMerge = (props) => {
    return (
      <TouchableOpacity
        style={[styles.tableKitchenStyle, {backgroundColor: '#ffbb99'}]}
        onPress={() => props.eventButton()}>
        <Image
          source={require('../../assets/images/icon-table.png')}
          style={styles.iconTableAwaitKitchen}
        />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemStatus}>{props.status}</Text>
      </TouchableOpacity>
    );
  };

  const TableUpFood = (props) => {
    return (
      <TouchableOpacity
        style={[styles.tableKitchenStyle, {backgroundColor: '#daffcc'}]}
        onPress={() => props.eventButton()}>
        <Image
          source={require('../../assets/images/icon-table.png')}
          style={styles.iconTableAwaitKitchen}
        />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemStatus}>{props.status}</Text>
      </TouchableOpacity>
    );
  };

  const TableDone = (props) => {
    return (
      <TouchableOpacity
        style={styles.tableDoneStyle}
        onPress={() => props.eventButton()}>
        <Image
          source={require('../../assets/images/icon-table.png')}
          style={styles.iconTableDone}
        />
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemStatus}>{props.status}</Text>
      </TouchableOpacity>
    );
  };

  const handleTableEmpty = (item) => {
    if(item.groupTable){
      Alert.alert("Thông báo", "Bàn đã được ghép \nVui lòng order tại bàn chính.");
      return;
    }
    props.navigation.navigate('invoice', {
      tableName: item.tableName,
      status: item.status,
      name: item.name,
      idOrder: item.idOrder,
    });
  };
  
  return (
    <FlatGrid
      itemDimension={130}
      // staticDimension={300}
      // fixed
      //spacing={10}
      data={items}
      style={styles.gridView}
      renderItem={({item, section, index}) =>
        item.type === 1 ? (
          <TableEmpty
            name={item.name}
            status={item.status}
            eventButton={() => handleTableEmpty(item)}
          />
        ) : item.type === 2 ? (
          <TableAwaitKitchen
            name={item.name}
            status={item.status}
            eventButton={() => handleTableEmpty(item)}
          />
        ) : item.type === 3 ? (
          <TableMerge
            name={item.name}
            status={item.status}
            eventButton={() => handleTableEmpty(item)}
          />
        ) : item.type === 4 ? (
          <TableUpFood
            name={item.name}
            status={item.status}
            eventButton={() => handleTableEmpty(item)}
          />
        ) : (
          <TableDone
            name={item.name}
            status={item.status}
            eventButton={() => handleTableEmpty(item)}
          />
        )
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefresh}
          onRefresh={() => {
            setRefresh(true);
            loadData();
          }}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: themes.Spacing.medium,
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    alignItems: 'center',
  },
  itemName: {
    fontSize: themes.Text.titleText,
    color: '#323232',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 14,
    color: '#323232',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 25,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: themes.Colors.white,
    color: themes.Colors.lable_text,
    padding: 10,
  },
  iconTable: {
    width: 70,
    height: 70,
  },

  //
  tableEmptyStyle: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    alignItems: 'center',
    backgroundColor: themes.Colors.white,
    borderWidth: 0.5,
    borderColor: 'rgba(50, 50, 50, 0.15)',
    elevation: 10,
  },
  iconTableEmpty: {
    width: 70,
    height: 70,
  },
  //
  tableKitchenStyle: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    alignItems: 'center',
    // backgroundColor: themes.Colors.light,
    borderWidth: 0.5,
    borderColor: 'rgba(50, 50, 50, 0.15)',
    elevation: 10,
  },
  iconTableAwaitKitchen: {
    width: 70,
    height: 70,
  },
  //
  tableDoneStyle: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    alignItems: 'center',
    backgroundColor: themes.Colors.done,
    borderWidth: 0.5,
    borderColor: 'rgba(50, 50, 50, 0.15)',
    elevation: 10,
  },
  iconTableDone: {
    width: 70,
    height: 70,
  },
});

const mapStateToProps = (state) => ({
  foods: state.foods,
  user: state.user,
  orders: state.orders,
});

export default connect(mapStateToProps, actions)(FloorsOne);
