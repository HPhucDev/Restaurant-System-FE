import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  SectionList,
  RefreshControl,
} from 'react-native';
import themes from '../../themes';
import CardItem from '../../components/CardItem';
import ModalSelectFoodItem from '../../components/ModalSelectFoodItem';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import {getAllFood} from '../../api/foodApi';
import formatCash from '../../utils/formatCash';

const MenuBeverages = (props) => {
  const [visible, setVisible] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [food, setFood] = useState({});
  const [note, setNote] = useState('');
  const [listFood, setListFood] = useState([]);

  useEffect(() => {
    getListFood();
  }, []);

  const getListFood = () => {
    let listDrink = [];
    setRefresh(true);
    getAllFood()
      .then((response) => {
        response.data.map((item) => {
          if (props.route.params.option === 'MANAGEMENT') {
            if (item.typeName === 'DRINK') {
              listDrink.push(item);
            }
          }
          else{
            if (item.typeName === 'DRINK' && item.status === 'ISACTIVE') {
              listDrink.push(item);
            }
          }
        });
        setRefresh(false);
        setListFood([{
          title: 'Nước',
          data: listDrink,
        }]);
      })
      .catch((error) =>{
        setRefresh(false);
        console.log(error);
      })
  };

  const handleSubmitAddFood = () => {
    setVisible(false);
    setQuantity(1);
    const payload = {
      idTable: props.route.params.tableName,
      id: food.id,
      name: food.name,
      urlImages: food.urlImages,
      price: food.price,
      quantity: quantity,
      note: note,
    };
    props.addFood(payload);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={listFood}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <CardItem
            urlImages={item.urlImages}
            nameFood={item.name}
            visible={item.status === 'ISACTIVE' ? true : false}
            price={formatCash(item.price + '')}
            eventButton={() => {
              props.route.params.option === 'invoice'
                ? setVisible(true)
                : setVisible(false);
              setFood(item);
              if(props.route.params.option === 'MANAGEMENT'){
                props.navigation.navigate('addFoodItem', {option: 'EDIT', idFood: item.id});
              }
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              fontSize: 32,
              backgroundColor: '#fff',
              marginLeft: themes.Spacing.medium,
            }}>
            {title}
          </Text>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => {
              getListFood();
            }}
          />
        }
      />
      <ModalSelectFoodItem
        visible={visible}
        numberItem={quantity}
        eventButtonCancel={() => setVisible(false)}
        eventButtonConfirm={() => handleSubmitAddFood()}
        onChangeText={(value) => {
          setNote(value);
        }}
        eventButtonMinus={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
        eventButtonPlus={() => {
          setQuantity(quantity + 1);
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
});
export default connect(null, actions)(MenuBeverages);
