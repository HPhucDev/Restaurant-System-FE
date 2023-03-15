import React, {useState, useEffect} from 'react';
import StatusBarCustom from '../../components/StatusBarCustom';
import TopNavigationMenu from '../../routers/TopNavigationMenu';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import themes from '../../themes';
import {TitleBar} from '../../components/TitleBar';
import BottomSheet from 'reanimated-bottom-sheet';
import CardItemSelect from '../../components/CardItemSelect';
import LinearGradient from 'react-native-linear-gradient';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import {createListOrderDetailApi, createOrderApi} from '../../api/orderApi';
import Spinner from '../../components/Spinner';
import ModalNoteOrder from '../../components/ModalNoteOrder';

const Menu = (props) => {
  const [loading, setLoading] = useState(false);
  const sheetRef = React.useRef();
  const tableName = props.route.params.tableName;
  const [foods, setFoods] = useState([]);
  const [idOrder, setIdOrder] = useState(props.route.params.idOrder);
  const [isShowBottomModal, setShowBottomModal] = useState(false);
  const [status, setStatus] = useState(props.route.params.status);


  const handleUserButton = () => {};

  useEffect(() => {
    props.route.params.option === 'invoice'
      ? setShowBottomModal(true)
      : setShowBottomModal(false);
  }, []);

  const formatCash = (str) => {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      });
  };

  const handleButtonMinus = (index) => {
    if (props.foods[index].quantity > 1) {
      props.foods[index].quantity -= 1;
      props.updateFood(props.foods[index]);
    }
  };

  const handleButtonPlus = (index) => {
    props.foods[index].quantity += 1;
    props.updateFood(props.foods[index]);
  };

  const handleRemoveFood = (index) => {
    props.deleteFood(props.foods[index]);
  };

  const handleCheckOut = async () => {
    if (idOrder === 0) {
      setLoading(true);
      await createOrderApi({
        idUser: props.user.userId,
        tableName: tableName,
        // note: params.note,
      })
        .then(async (response) => {
          setIdOrder(response.data.id);
          console.log(response.data)
          // setStatus(response.data.orderStatus[0].status);
          let idOrderRes = response.data.id;
          if (props.foods.length != 0) {
            let listFoodDetailOrder = [];
            props.foods.map((item) => {
              listFoodDetailOrder.push({
                idFoodItem: item.id,
                idOrder: response.data.id,
                note: item.note,
                quantity: item.quantity,
                status: 'NEW',
              });
            });
            await createListOrderDetailApi({
              listFoodDetailOrder,
            })
              .then((response) => {
                setLoading(false);
                Alert.alert(
                  'Thông báo',
                  'Đặt món thành công! Thông tin sẽ được chuyển xuống bếp xử lý.',
                );
                props.navigation.navigate('invoice', {
                  tableName: tableName,
                  status: status,
                  idOrder: idOrderRes,
                  isReload: !props.route.params.isReload,
                });
                props.loadFood([]);
              })
              .catch((error) => {
                setLoading(false);
                Alert.alert(
                  'Thông báo',
                  'Có lỗi khi đặt món! Vui lòng thử lại',
                );
                console.log(error.response);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else if (idOrder !== 0) {
      setLoading(true);
      if (props.foods.length != 0) {
        let listFoodDetailOrder = [];
        props.foods.map((item) => {
          listFoodDetailOrder.push({
            idFoodItem: item.id,
            idOrder: idOrder,
            note: item.note,
            quantity: item.quantity,
            status: 'NEW',
          });
        });
        await createListOrderDetailApi({
          listFoodDetailOrder,
        })
          .then((response) => {
            setLoading(false);
            Alert.alert(
              'Thông báo',
              'Đặt món thành công! Thông tin sẽ được chuyển xuống bếp xử lý.',
            );
            props.navigation.navigate('invoice', {
              tableName: tableName,
              status: status,
              idOrder: idOrder,
              isReload: !props.route.params.isReload,
            });
            props.loadFood([]);
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert('Thông báo', 'Có lỗi khi đặt món! Vui lòng thử lại');
            console.log(error.response);
          });
      } else {
        setLoading(false);
        Alert.alert('Thông báo', 'Vui lòng chọn món');
      }
    }
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <Text
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          fontSize: themes.Text.titleBar,
          fontWeight: '600',
        }}>
        Món ăn đã chọn
      </Text>
      {/* <View style={styles.lineView}></View> */}

      <FlatList
        data={props.foods}
        style={{marginBottom: 70}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CardItemSelect
            urlImages={item.urlImages}
            nameFood={item.name}
            price={formatCash(item.price + '')}
            numberItem={item.quantity}
            status={item.note}
            eventButtonMinus={() => handleButtonMinus(index)}
            eventButtonPlus={() => handleButtonPlus(index)}
            eventRemoveFood={() => handleRemoveFood(index)}
          />
        )}
      />

      <ButtonCheckOut />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <TouchableOpacity
          onPress={() => {
            sheetRef.current.snapTo('100%');
          }}>
          <Entypo name="chevron-up" size={35} color={themes.Colors.dark_gray} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ButtonCheckOut = () => {
    return (
        <TouchableOpacity
          style={styles.buttonCheckOutView}
          onPress={() => handleCheckOut()}>
          <LinearGradient
            style={{
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[themes.Colors.start, themes.Colors.end]}>
            <Text style={styles.buttonCheckOutText}>Đặt món</Text>
          </LinearGradient>
        </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <TitleBar
        name="Menu"
        eventButton={() => {
          props.navigation.navigate('invoice', {
            tableName: tableName,
            status: status,
            idOrder: idOrder,
            isReload: !props.route.params.isReload,
          });
        }}
      />
      {/* <View style={styles.searchView}>
        <Icon
          name="search"
          size={30}
          color={themes.Colors.primary}
          style={styles.iconStyle}
        />
        <TextInput style={styles.inputStyle} placeholder="Tìm kiếm món" />
      </View> */}
      {isShowBottomModal ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[150, '95%', '50%', '50%']}
          borderRadius={10}
          renderHeader={renderHeader}
          renderContent={renderContent}
          // initialSnap={1}
          overdragResistanceFactor={1}
          enabledInnerScrolling={true}
          enabledGestureInteraction={true}
          enabledHeaderGestureInteraction={true}
          enabledContentGestureInteraction={false}
        />
      ) : null}

      <TopNavigationMenu
        option={props.route.params.option}
        tableName={props.route.params.option === 'invoice' ? tableName : ''}
      />
      <Spinner isVisible={loading} />
      {/* <ModalNoteOrder
        visible={true}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  searchView: {
    flexDirection: 'row',
    borderColor: themes.Colors.dark_gray,
    alignItems: 'center',
    marginHorizontal: themes.Spacing.large,
    borderRadius: 5,
    borderWidth: 0.5,
    marginVertical: themes.Spacing.large,
  },
  inputStyle: {
    width: '100%',
    marginLeft: themes.Spacing.medium,
  },
  iconStyle: {
    marginLeft: themes.Spacing.medium,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 1,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: themes.Colors.primary,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  lineView: {
    borderWidth: 0.2,
    borderStyle: 'dotted',
    marginHorizontal: themes.Spacing.extra_large,
    marginTop: themes.Spacing.medium,
    borderColor: themes.Colors.dark_gray,
  },
  buttonCheckOutView: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 0,
    height: 70,
    justifyContent: 'center',
  },
  buttonCheckOutText: {
    color: themes.Colors.white,
    fontSize: themes.Text.titleBar,
    lineHeight: 70,
  },
});

const mapStateToProps = (state) => ({
  foods: state.foods,
  user: state.user,
});

export default connect(mapStateToProps, actions)(Menu);
