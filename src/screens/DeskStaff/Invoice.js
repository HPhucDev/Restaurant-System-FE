import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import themes from '../../themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import {getOrderById, updateStatusOrder} from '../../api/orderApi';
import CardItemDelete from '../../components/CardItemDelete';
import formatCash from '../../utils/formatCash';
import TitleInvoice from '../../components/TitleInvoice';
import convertStatusTable from '../../utils/convertStatusTable';
import {updateStatusOrderDetailApi} from '../../api/orderDetailApi';
import SpinnerCustom from '../../components/Spinner';

const Invoice = (props) => {
  const [isRefresh, setRefresh] = useState(false);
  const tableName = props.route.params.tableName;
  const [status, setStatus] = useState(props.route.params.status);
  const name = props.route.params.name;
  const idOrder = props.route.params.idOrder;
  const isReload = props.route.params.isReload;
  const [loading, setLoading] = useState(false);

  const [foodsOrder, setFoodsOrder] = useState([]);

  useEffect(() => {
    loadDataFoods(idOrder);
  }, [isReload]);

  const loadDataFoods = async () => {
    if (idOrder !== 0) {
      setRefresh(true);
      await getOrderById({
        id: idOrder,
      })
        .then((response) => {
          setRefresh(false);
          setStatus(response.data.orderStatus[0].status);
          console.log(response.data);
          setFoodsOrder(response.data.orderDetailModels);
        })
        .catch((error) => {
          setRefresh(false);
          console.log(error);
        });
    }
  };

  const priceListFood = (listFood) => {
    let value = 0;
    listFood.forEach((item) => {
      value += item.foodItemModel.price * item.quantity;
    });
    return value;
  };

  const CardItem = (props) => {
    return (
      <TouchableOpacity
        style={styles.cardItem}
        onPress={() => props.eventButton()}>
        <MaterialCommunityIcons
          name={props.nameIcon}
          size={50}
          style={styles.cardIcon}
          color={themes.Colors.primary}
        />
        <Text style={styles.cardText}>{props.name}</Text>
      </TouchableOpacity>
    );
  };

  const CheckOutFooter = (props) => {
    return (
      <View style={styles.buttonCheckOutView}>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[themes.Colors.start, themes.Colors.end]}>
          <View style={styles.infoPrice}>
            <Text style={styles.sumFoodItemText}>Số lượng:</Text>
            <Text style={styles.sumFoodItem}>{props.numberItem} món</Text>
          </View>
          <View style={styles.infoPrice}>
            <Text style={styles.sumFoodItemText}>Tổng tiền:</Text>
            <Text style={styles.sumFoodItem}>{props.price} VNĐ</Text>
          </View>
        </LinearGradient>
      </View>
    );
  };
  const ButtonCheckOut = () => {
    return (
      <TouchableOpacity style={styles.buttonCheckOutView}>
        <LinearGradient
          style={{
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[themes.Colors.start, themes.Colors.end]}>
          <Text style={styles.buttonCheckOutText}>Thanh toán</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const handleCallFood = () => {
    props.navigation.navigate('menu', {
      option: 'invoice',
      tableName: tableName,
      idOrder: idOrder,
      foodsOrder: foodsOrder,
      status: status,
      isReload: isReload,
    });
  };
  const handleGroupTable = () => {
    props.navigation.navigate('pairingTable', {
      tableName: tableName,
      idOrder: idOrder,
    });
  };
  const handleUnGroupTable = () => {
    props.navigation.navigate('detachedTable', {
      tableName: tableName,
      idOrder: idOrder,
    });
  };

  const handleButtonMinus = (index) => {
    // if(foodSelect[index].numberItem > 1){
    //   foodSelect[index].numberItem -= 1;
    //   setFoodSelect([...foodSelect]);
    // }
  };

  const handleButtonPlus = (index) => {
    // foodSelect[index].numberItem += 1;
    // setFoodSelect([...foodSelect]);
  };

  const removeFoodApi = (id) => {
    setLoading(true);
    updateStatusOrderDetailApi({
      id: id,
      status: 'REFUSE',
    })
      .then((response) => {
        setLoading(false);
        loadDataFoods();
        Alert.alert('Thông báo', 'Hủy món thành công!');
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Thông báo', 'Hủy món thất bại!');
        console.log(error);
      });
  };

  const handleRemoveFood = (id) => {
    Alert.alert('Thông báo', 'Bạn có chắn chắn muốn hủy', [
      {
        text: 'Có',
        onPress: () => {
          removeFoodApi(id);
        },
      },
      {
        text: 'Không',
        onPress: () => {},
      },
    ]);
  };

  const cancelOrderApi = () => {
    setLoading(true);
    updateStatusOrder({
      id: idOrder,
      status: 'CANCEL',
    })
      .then((response) => {
        setLoading(false);
        Alert.alert('Thông báo', 'Hủy hóa đơn thành công!');
        props.navigation.navigate('mainDeskStaff');
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Thông báo', 'Có lỗi khi hủy hóa đơn.');
        console.log(error);
      });
  };

  const cancelOrder = () => {
    if (foodsOrder.length > 0) {
      let isDelete = true;
      for (let i = 0; i < foodsOrder.length; i++) {
        if (foodsOrder[i].status !== 'REFUSE') {
          isDelete = false;
          Alert.alert(
            'Thông báo',
            'Món ăn đã được đặt hoặc bếp đã xác nhận \nKhông thể hủy hóa đơn',
          );
          return;
        }
      }
      if (isDelete) {
        Alert.alert('Thông báo', 'Bạn có chắc chắn muốn hủy hóa đơn?', [
          {
            text: 'Hủy',
            onPress: () => {},
          },
          {text: 'OK', onPress: () => cancelOrderApi()},
        ]);
      }
    } else {
      Alert.alert('Thông báo', 'Bạn có chắc chắn muốn hủy hóa đơn?', [
        {
          text: 'Hủy',
          onPress: () => {},
        },
        {text: 'OK', onPress: () => cancelOrderApi()},
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerCustom isVisible={loading} />
      <TitleInvoice
        title="Lập đơn hàng"
        eventGoBack={() => props.navigation.goBack()}
        eventRemove={cancelOrder}
      />
      <View style={styles.infoTable}>
        <Text style={styles.tableText}>{name} - </Text>
        <Text style={styles.tableStatusText}>{convertStatusTable(status)}</Text>
      </View>
      <View style={styles.cardView}>
        <CardItem name="Gọi món" nameIcon="food" eventButton={handleCallFood} />
        <CardItem
          name="Ghép bàn"
          nameIcon="group"
          eventButton={handleGroupTable}
        />
        <CardItem
          name="Tách bàn"
          nameIcon="ungroup"
          eventButton={handleUnGroupTable}
        />
      </View>
      <Text style={styles.titleFoodSelect}>Món đã chọn</Text>
      <View style={styles.flatListStyle}>
        <FlatList
          data={foodsOrder}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <CardItemDelete
              urlImages={item.foodItemModel.urlImages}
              nameFood={item.foodItemModel.name}
              price={formatCash(item.foodItemModel.price + '')}
              numberItem={item.quantity}
              note={item.note}
              status={item.status}
              eventRemoveFood={() => handleRemoveFood(item.id)}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                loadDataFoods(idOrder);
              }}
            />
          }
        />
        <AntDesign name="arrowdown" size={25} style={styles.downIcon} />
      </View>
      <CheckOutFooter
        numberItem={foodsOrder.length}
        price={formatCash(priceListFood(foodsOrder) + '')}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  infoTable: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  tableStatusText: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.done,
  },
  tableText: {
    marginLeft: themes.Spacing.medium,
    fontSize: themes.Text.titleBar,
  },
  cardView: {
    flexDirection: 'row',
  },
  cardItem: {
    backgroundColor: themes.Colors.white,
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: themes.Spacing.large,
    height: 100,
    marginVertical: themes.Spacing.large,
    borderRadius: 5,
    elevation: 5,
  },
  cardItemRight: {
    position: 'absolute',
    right: themes.Spacing.large,
  },
  cardIcon: {},
  cardText: {
    fontSize: themes.Text.titleText,
    marginTop: themes.Spacing.medium,
  },
  titleFoodSelect: {
    fontSize: themes.Text.titleBar,
    marginLeft: themes.Spacing.large,
    alignSelf: 'center',
    color: themes.Colors.dark_gray,
    fontWeight: '600',
  },
  flatListStyle: {
    height: '55%',
  },
  downIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    color: themes.Colors.primary,
  },
  checkOutFooter: {
    elevation: 3,
    position: 'absolute',
    width: '100%',
    bottom: 20,
    height: 80,
  },
  infoPrice: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginTop: themes.Spacing.medium,
    alignItems: 'center',
  },
  sumFoodItemText: {
    fontSize: themes.Text.titleBar,
    color: themes.Colors.white,
  },
  sumFoodItem: {
    fontSize: themes.Text.titleBar,
    position: 'absolute',
    right: themes.Spacing.medium,
    fontWeight: '900',
    fontStyle: 'italic',
    color: themes.Colors.white,
  },
  buttonCheckOutView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 90,
  },
  buttonCheckOutText: {
    color: themes.Colors.white,
    fontSize: themes.Text.titleBar,
    lineHeight: 70,
  },
});

const mapStateToProps = (state) => ({
  foods: state.foods,
});

export default connect(mapStateToProps, actions)(Invoice);
