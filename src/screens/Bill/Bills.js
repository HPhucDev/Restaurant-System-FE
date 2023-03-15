import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import StatusBarCustom from '../../components/StatusBarCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from '../../themes';
import {TitleBar} from '../../components/TitleBar';
import BillItem from '../../components/BillItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getFormattedDate} from '../../utils/dateTime';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions';
import {orderFindByCashierDate, orderFindByUserDate} from '../../api/orderApi';
import convertStatusTable from '../../utils/convertStatusTable';

const Bills = (props) => {
  const [dateCalender, setDateCalender] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    findByDate(dateCalender);
  }, [dateCalender]);

  const onChangeCalendar = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || dateCalender;
    setDateCalender(currentDate);
  };

  const findByDate = async (date) => {
    setRefresh(true);

    if (props.user.role === 'CASHIER_STAFF') {
      await orderFindByCashierDate({
        date: getFormattedDate(date),
      })
        .then((response) => {
          setRefresh(false);
          setOrders(response.data);
        })
        .catch((error) => {
          setRefresh(false);
          console.log(error);
        });
    } else {
      await orderFindByUserDate({
        idUser: props.user.userId,
        date: getFormattedDate(date),
      })
        .then((response) => {
          setRefresh(false);
          setOrders(response.data);
        })
        .catch((error) => {
          setRefresh(false);
          console.log(error.response);
        });
    }
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          marginTop: themes.Spacing.ultimate_large,
          marginBottom: themes.Spacing.medium,
        }}>
        <Image
          source={require('../../assets/images/empty.png')}
          style={styles.emptyImage}
        />
        <View style={{marginTop: themes.Spacing.large}}>
          <Text style={styles.emptyText}>
            Không tìm thấy hóa đơn cho ngày {getFormattedDate(dateCalender)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <TitleBar
        name="Danh sách hóa đơn"
        eventButton={props.navigation.goBack}
      />
      <TouchableOpacity
        style={styles.searchView}
        onPress={() => setShowDatePicker(true)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{flexDirection: 'row', marginLeft: themes.Spacing.medium}}>
            <Text>Lọc hóa đơn theo ngày: </Text>
            <Text style={{fontWeight: 'bold'}}>
              {getFormattedDate(dateCalender)}
            </Text>
          </View>
        </View>
        <Icon
          name="calendar"
          size={30}
          color={themes.Colors.primary}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <BillItem
            tableName={item.tableName}
            idOrder={item.id}
            quantity={item.orderDetailModels.length}
            status={convertStatusTable(item.orderStatus[0].status)}
            eventButton={() => {
              props.navigation.navigate('billDocument', {order: item});
            }}
          />
        )}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => {
              findByDate(dateCalender);
            }}
          />
        }
      />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateCalender}
          mode="date"
          is24Hour={true}
          display={
            Platform.OS === 'ios' && Platform.Version >= 14.4
              ? 'inline'
              : 'default'
          }
          onChange={onChangeCalendar}
          dateFormat="day month year"
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
  searchView: {
    flexDirection: 'row',
    borderColor: themes.Colors.dark_gray,
    alignItems: 'center',
    marginHorizontal: themes.Spacing.large,
    borderRadius: 5,
    borderWidth: 0.5,
    height: 45,
    marginVertical: themes.Spacing.large,
    justifyContent: 'space-between',
  },
  inputStyle: {
    marginLeft: themes.Spacing.medium,
  },
  iconStyle: {
    marginRight: themes.Spacing.medium,
  },
  emptyImage: {
    alignSelf: 'center',
    width: 193,
    height: 225,
  },
  emptyText: {
    textAlign: 'center',
    color: themes.Colors.light_gray,
    fontSize: themes.Text.dateText,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(Bills);
