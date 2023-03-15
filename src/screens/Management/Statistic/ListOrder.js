import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import BillItem from '../../../components/BillItem';
import StatusBarCustom from '../../../components/StatusBarCustom';
import { TitleBar } from '../../../components/TitleBar';
import * as actions from '../../../redux/actions';
import themes from '../../../themes';
import convertStatusTable from '../../../utils/convertStatusTable';

const ListOrder = (props) => {
  const [isRefresh, setRefresh] = useState(false);
  const [orders, setOrders] = useState(props.route.params.orders);

  const renderEmpty = () => {
    return (
      <View
        style={{
          marginTop: themes.Spacing.ultimate_large,
          marginBottom: themes.Spacing.medium,
        }}>
        <Image
          source={require('../../../assets/images/empty.png')}
          style={styles.emptyImage}
        />
        <View style={{marginTop: themes.Spacing.large}}>
          <Text style={styles.emptyText}>
            Không có hóa đơn
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
              props.navigation.navigate('orderDetail', {order: item});
            }}
          />
        )}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => {
            //   findByDate(dateCalender);
            }}
          />
        }
      />
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

export default connect(mapStateToProps, actions)(ListOrder);
