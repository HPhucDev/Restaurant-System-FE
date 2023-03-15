import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  SectionList,
  SafeAreaView,
  StyleSheet,
  Text,
  RefreshControl,
} from 'react-native';
import Header from '../../components/Header';
import StatusBarCustom from '../../components/StatusBarCustom';
import {TitleBar} from '../../components/TitleBar';
import themes from '../../themes';
import {getStatusTableByOrder, updateStatusOrder} from '../../api/orderApi';
import formatCash from '../../utils/formatCash';
import CardItemKitchen from '../../components/CardItemKitchen';
import convertNameTable from '../../utils/convertNameTable';


const HomeKitchenStaff = (props) => {
  const [isRefresh, setRefresh] = useState(false);
  const handleUserButton = () => {};
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setRefresh(true);
    let interval = setInterval(() => {
      loadData();
    }, 2000);
    return () => {
      clearInterval(interval);
    }
  }, [])

  const setOrderGroupTable = (orders) => {
    if (orders.length > 0) {
      let groupOrder = [];
      orders.map((item) => {
        groupOrder.push({
          title: item.tableName,
          data: item.orderDetailModels
        });
      });
      setOrders([...groupOrder]);
    }
  };

  

  const loadData = async () => {
    await getStatusTableByOrder()
      .then((response) => {
        setRefresh(false);
        setOrderGroupTable(response.data.reverse());
      })
      .catch((error) => {
        setRefresh(false);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <TitleBar name="Danh sách món ăn" eventButton={props.navigation.goBack} />
      <Header />
      <SectionList
        style={{marginTop: themes.Spacing.extra_large}}
        sections={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, id}) => (
          <CardItemKitchen
            urlImages={item.foodItemModel.urlImages}
            nameFood={item.foodItemModel.name}
            price={formatCash(item.foodItemModel.price + '')}
            numberItem={item.quantity}
            note={item.note}
            status={item.status}
            eventButton={() => {
              props.navigation.navigate("foodDetail", {orderItem: item})}
            }
          />
          // <CardItem
          //   urlImages={item.foodItemModel.urlImages}
          //   nameFood={item.foodItemModel.name}
          //   price={item.price}
          //   eventButton={() => {
          //       props.navigation.navigate("foodDetail")
          //   }}
          // />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              fontSize: themes.Text.titleBar,
              fontWeight: 'bold',
              backgroundColor: '#fff',
              marginLeft: themes.Spacing.medium,
              alignSelf: 'center',
            }}>
            {convertNameTable(title)}
          </Text>
        )}
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
});
export default HomeKitchenStaff;
