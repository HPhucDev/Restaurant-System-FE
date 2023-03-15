import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import themes from '../../themes';
import StatusBarCustom from '../../components/StatusBarCustom';
import {TitleBar} from '../../components/TitleBar';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import {payment} from '../../api/orderApi';
import {useState} from 'react';
import SpinnerCustom from '../../components/Spinner';

const BillDocument = (props) => {
  const order = props.route.params.order;
  const [loading, setLoading] = useState(false);

  const sumTotal = () => {
    let sum = 0;
    order.orderDetailModels.map((item) => {
      sum += item.foodItemModel.price * item.quantity;
    });
    return sum;
  };

  const paymentCashier = async () => {
    if (order.orderStatus[0].status === 'PAID') {
      Alert.alert('Thông báo', 'Hóa đơn này đã được thanh toán!');
    }
    else if (order.orderStatus[0].status === 'CANCEL') {
      Alert.alert('Thông báo', 'Hóa đơn này đã được thanh toán!');
    }
    else {
      setLoading(true);
      await payment({
        id: order.id,
      })
        .then((response) => {
          setLoading(false);
          Alert.alert('Thông báo', 'Thanh toán thành công!');
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert('Thông báo', 'Bếp chưa xác nhận món ăn \nKhông thể thanh toán.');
          console.log(error.response);
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
          <Text style={styles.buttonCheckOutText}>Thanh toán</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerCustom isVisible={loading} />
      <StatusBarCustom />
      <TitleBar name="Chi tiết hóa đơn" eventButton={props.navigation.goBack} />
      <ScrollView
        style={styles.contentView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleView}>
          <Image
            style={styles.logoStyle}
            source={require('../../assets/images/logo-rm.png')}
          />
          <View style={styles.infoRestaurant}>
            <Text style={styles.titleRestaurant}>Nhà hàng Phố Núi</Text>
            <Text style={styles.titleAddress} numberOfLines={2}>
              14 Nguyễn Văn Bảo, Gò Vấp, Hồ Chí Minh
            </Text>
            <Text style={styles.billText}>Hóa đơn thanh toán</Text>
          </View>
        </View>
        <View style={styles.infoBill}>
          <View style={styles.infoBillText}>
            <Text style={{}}>Số phiếu: #{order.id} </Text>
            <Text>Bàn: {order.tableName}</Text>
          </View>
          <View style={styles.infoBillText}>
            <Text>Ngày: {order.dateIn} </Text>
            <Text>Phục vụ: {props.user.fullName}</Text>
          </View>
          <View style={{width: '100%'}}>
            <View style={styles.titleListBillView}>
              <Text style={styles.titleListBill}>Tên món</Text>
              <Text style={styles.titleListBill}>SL</Text>
              <Text style={styles.titleListBill}>ĐVT</Text>
              <Text style={styles.titleListBill}>Đơn giá</Text>
              <Text style={styles.titleListBill}>Thành tiền</Text>
            </View>
            <View style={{borderWidth: 0.5, width: '100%'}} />
            {order.orderDetailModels.map((item, index) => {
              return (
                <View key={index.toString()} style={styles.titleListBillView}>
                  <Text style={styles.itemListBill}>
                    {item.foodItemModel.name}
                  </Text>
                  <Text style={styles.itemListBill}>{item.quantity}</Text>
                  <Text style={styles.itemListBill}>phần</Text>
                  <Text style={styles.itemListBill}>
                    {item.foodItemModel.price}
                  </Text>
                  <Text style={styles.itemListBill}>
                    {item.quantity * item.foodItemModel.price} Đ
                  </Text>
                </View>
              );
            })}
            <View style={{borderWidth: 0.5, width: '100%'}} />
            <View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Thành tiền: </Text>
                <Text>{sumTotal()} VNĐ</Text>
              </View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Giảm giá: </Text>
                <Text>0 VNĐ </Text>
              </View>
              <View style={styles.totalView}>
                <Text style={[styles.totalText, {fontWeight: 'bold'}]}>
                  Tổng tiền:{' '}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {sumTotal()} VNĐ
                </Text>
              </View>
            </View>
            <View style={styles.wishView}>
              <Text style={{fontWeight: 'bold'}}>
                Cảm ơn quý khách! Hẹn gặp lại
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {props.user.role === 'CASHIER_STAFF' && (
        <ButtonCheckOut
          eventButton={() => {
            Alert.alert('Thông báo', 'Xác nhận thanh toán? ', [
              {
                text: 'Có',
                onPress: () => {
                  paymentCashier();
                },
              },
              {
                text: 'Không',
                onPress: () => {},
              },
            ]);
          }}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  logoStyle: {
    width: 150,
    height: 120,
    marginTop: themes.Spacing.extra_large,
  },
  contentView: {
    marginHorizontal: themes.Spacing.medium,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRestaurant: {
    marginHorizontal: themes.Spacing.large,
  },
  titleRestaurant: {
    fontSize: themes.Text.titleBar,
    fontWeight: 'bold',
  },
  titleAddress: {
    fontSize: themes.Text.titleText,
    width: '70%',
    textAlign: 'center',
  },
  billText: {
    fontSize: themes.Text.titleBar,
    fontWeight: '800',
    marginTop: themes.Spacing.extra_large + 10,
  },
  infoBill: {
    marginVertical: themes.Spacing.large,
    alignItems: 'center',
  },
  infoBillText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleListBillView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: themes.Spacing.medium,
  },
  titleListBill: {
    fontSize: themes.Text.titleText,
    fontWeight: '800',
    width: '20%',
  },
  itemListBill: {
    fontSize: themes.Text.dateText,
    fontWeight: '400',
    width: '20%',
  },
  totalView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: themes.Text.titleText,
  },
  wishView: {
    alignItems: 'center',
    marginVertical: themes.Spacing.medium,
  },
  buttonCheckOutView: {
    position: 'absolute',
    width: '100%',
    backgroundColor: themes.Colors.end,
    alignItems: 'center',
    bottom: 0,
    height: 60,
    justifyContent: 'center',
  },
  buttonCheckOutText: {
    color: themes.Colors.white,
    fontSize: themes.Text.titleBar,
    lineHeight: 60,
  },
});
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(BillDocument);
