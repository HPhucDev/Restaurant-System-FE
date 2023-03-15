import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StatusBarCustom from '../../components/StatusBarCustom';
import LinearGradient from 'react-native-linear-gradient';
import {TitleBar} from '../../components/TitleBar';
import themes from '../../themes';
import formatCash from '../../utils/formatCash';
import {updateStatusOrderDetailApi} from '../../api/orderDetailApi';
import SpinnerCustom from '../../components/Spinner';
import {getOrderById, updateStatusOrder} from '../../api/orderApi';
const FoodDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(props.route.params.orderItem);
  const [status, setStatus] = useState(props.route.params.orderItem.status);

  const convertStatusFood = (status) => {
    switch (status) {
      case 'NEW':
        return 'Món ăn chưa được chấp nhận';
      case 'ACCEPT':
        return 'Món ăn đang được chuẩn bị';
      case 'REFUSE':
        return 'Đã từ chối món ăn';
      case 'FINISH':
        return 'Món ăn đã hoàn thành';
      default:
        return '';
    }
  };

  const convertStatusOrder = (status) => {
    switch (status) {
      case 'ACCEPT':
        return 'WAIT_KICHEN';
      case 'REFUSE':
        return 'WAIT_KICHEN';
      case 'FINISH':
        return 'UPFOOD';
      default:
        return 'WAIT_KICHEN';
    }
  };

  const checkStatusOrderDetail = (list) => {
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].status !== 'FINISH') {
          return false;
        }
      }
      return true;
    }
  };

  const changeStatusOrderEnoighFood = async(status) => {
    setLoading(true);
    await getOrderById({
      id: orders.idOrder,
    })
      .then((response) => {
        if (checkStatusOrderDetail(response.data.orderDetailModels)) {
          updateStatusOrder({
            id: orders.idOrder,
            status: 'ENOIGHFOOD',
          })
            .then((response) => {
              setLoading(false);
              Alert.alert('Thông báo', 'Đã cập nhật thông tin món.');
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        }
        else{
          updateStatusOrder({
            id: orders.idOrder,
            status: convertStatusOrder(status),
          })
          .then(async (response) => {
            setLoading(false);
            Alert.alert('Thông báo', 'Đã cập nhật thông tin món.');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const updateStatus = async (status) => {
    setLoading(true);
    await updateStatusOrderDetailApi({
      id: orders.id,
      status: status,
      quantity: orders.quantity,
      note: orders.note,
    })
      .then((response) => {
        setLoading(false);
        changeStatusOrderEnoighFood(status);
      //   await updateStatusOrder({
      //     id: orders.idOrder,
      //     status: convertStatusOrder(status),
      //   })
      //     .then(async (response) => {
      //       await changeStatusOrderEnoighFood();
      //       Alert.alert('Thông báo', 'Đã cập nhật thông tin món.');
      //       console.log(response.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
        // Alert.alert('Thông báo', 'Đã cập nhật thông tin món.');
        setOrders(response.data);
        setStatus(response.data.status);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Alert.alert('Thông báo', 'Cập nhật thông tin món thất bại.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <TitleBar name="Chi tiết đặt món" eventButton={props.navigation.goBack} />
      <Text style={styles.statusText}>{convertStatusFood(status)}</Text>
      <View style={styles.foodView}>
        <Image
          style={styles.iconFood}
          source={{
            uri: orders.foodItemModel.urlImages,
          }}
        />
        <View style={styles.contentText}>
          <Text style={styles.textStyle}>{orders.foodItemModel.name}</Text>
          <Text style={[styles.textStyle, styles.priceText]}>
            {formatCash(orders.foodItemModel.price + '')} VNĐ
          </Text>
          <Text
            style={{
              color: themes.Colors.dark_grown,
              marginTop: themes.Spacing.extra_large,
            }}>
            Số lượng: {orders.quantity}
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: themes.Spacing.medium}}>
        <Text style={{fontSize: themes.Text.titleText}}>
          Lời nhắn cho bếp:{' '}
        </Text>
        <Text
          style={{
            fontSize: themes.Text.dateText,
            fontStyle: 'italic',
            color: themes.Colors.done,
          }}>
          {orders.note}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginVertical: themes.Spacing.extra_large,
        }}>
        {status === 'ACCEPT' ? (
          <TouchableOpacity
            style={styles.buttonAcceptView}
            onPress={() => {
              Alert.alert('Thông báo', 'Món ăn đã hoàn thành? ', [
                {
                  text: 'Có',
                  onPress: () => {
                    updateStatus('FINISH');
                  },
                },
                {
                  text: 'Không',
                  onPress: () => {},
                },
              ]);
            }}>
            <LinearGradient
              style={styles.linearView}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[themes.Colors.done, themes.Colors.done]}>
              <Text style={styles.buttonText}>Món ăn đã sẵn sàng</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : status === 'NEW' ? (
          <React.Fragment>
            <TouchableOpacity
              style={styles.buttonAcceptView}
              onPress={() => {
                Alert.alert('Thông báo', 'Bạn có chắc chắn chấp nhận món ăn?', [
                  {
                    text: 'Có',
                    onPress: () => {
                      updateStatus('ACCEPT');
                    },
                  },
                  {
                    text: 'Không',
                    onPress: () => {},
                  },
                ]);
              }}>
              <LinearGradient
                style={styles.linearView}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[themes.Colors.start, themes.Colors.end]}>
                <Text style={styles.buttonText}>Chấp nhận</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAcceptView}
              onPress={() => {
                Alert.alert('Thông báo', 'Xác nhận hủy món?', [
                  {
                    text: 'Có',
                    onPress: () => {
                      updateStatus('REFUSE');
                    },
                  },
                  {
                    text: 'Không',
                    onPress: () => {},
                  },
                ]);
              }}>
              <LinearGradient
                style={styles.linearView}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[themes.Colors.start, themes.Colors.end]}>
                <Text style={styles.buttonText}>Từ chối</Text>
              </LinearGradient>
            </TouchableOpacity>
          </React.Fragment>
        ) : (
          status === 'FINISH' && (
            <View style={styles.buttonAcceptView}>
              <LinearGradient
                style={styles.linearView}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[themes.Colors.start, themes.Colors.end]}>
                <Text style={styles.buttonText}>Món ăn đã hoàn thành</Text>
              </LinearGradient>
            </View>
          )
        )}
        {status === 'REFUSE' && (
          <View style={styles.buttonAcceptView}>
            <LinearGradient
              style={styles.linearView}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[themes.Colors.danger, themes.Colors.danger]}>
              <Text style={styles.buttonText}>Đã hủy món và gọi nhân viên</Text>
            </LinearGradient>
          </View>
        )}
      </View>
      <SpinnerCustom isVisible={loading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  foodView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    borderRadius: 10,
  },
  iconFood: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  contentText: {
    marginHorizontal: themes.Spacing.medium,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: themes.Text.titleText,
    color: themes.Colors.dark_grown,
  },
  priceText: {
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  iconStarStyle: {
    position: 'absolute',
    right: themes.Spacing.medium,
    alignSelf: 'center',
    color: themes.Colors.primary,
  },
  buttonAcceptView: {
    marginVertical: themes.Spacing.small,
    width: '75%',
  },
  linearView: {
    alignItems: 'center',
    padding: themes.Spacing.large,
    borderRadius: 5,
  },
  buttonText: {
    color: themes.Colors.white,
  },
  statusText: {
    fontSize: themes.Text.titleText,
    color: themes.Colors.done,
    alignSelf: 'center',
  },
});
export default FoodDetail;
