import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  SectionList,
  Text,
  RefreshControl,
} from 'react-native';
import themes from '../../themes';
import CardItem from '../../components/CardItem';
import ModalSelectFoodItem from '../../components/ModalSelectFoodItem';
import * as actions from '../../redux/actions';
import {connect} from 'react-redux';
import {getAllFood, getFoodItemByTypeApi} from '../../api/foodApi';
import formatCash from '../../utils/formatCash';

const MenuFood = (props) => {
  const [isRefresh, setRefresh] = useState(false);

  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [food, setFood] = useState({});
  const [note, setNote] = useState('');
  const [listFood, setListFoods] = useState([]);

  useEffect(() => {
    getListFood();
  }, []);

  // Món gỏi
  const getListFood = async () => {
    let listMenu = [];
    let listSalad = [];
    let listGrilled = [];
    let listHotPot = [];

    setRefresh(true);
    getAllFood()
      .then((response) => {
        response.data.map((item) => {
          if (props.route.params.option === 'MANAGEMENT') {
            if (item.typeName === 'GRILLED') {
              listGrilled.push(item);
            } else if (item.typeName === 'HOT_POT') {
              listHotPot.push(item);
            } else if (item.typeName === 'SALAD') {
              listSalad.push(item);
            }
          } else {
            if (item.typeName === 'GRILLED' && item.status === 'ISACTIVE') {
              listGrilled.push(item);
            } else if (
              item.typeName === 'HOT_POT' &&
              item.status === 'ISACTIVE'
            ) {
              listHotPot.push(item);
            } else if (
              item.typeName === 'SALAD' &&
              item.status === 'ISACTIVE'
            ) {
              listSalad.push(item);
            }
          }
        });
        listMenu.push({
          title: 'Món Nướng',
          data: listGrilled,
        });
        listMenu.push({
          title: 'Món Lẩu',
          data: listHotPot,
        });
        listMenu.push({
          title: 'Món Gỏi',
          data: listSalad,
        });
        setRefresh(false);
        setListFoods(listMenu);
      })
      .catch((error) => {
        setRefresh(false);
        console.log(error);
      });
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
              if (props.route.params.option === 'MANAGEMENT') {
                props.navigation.navigate('addFoodItem', {
                  option: 'EDIT',
                  idFood: item.id,
                });
              }
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={{
              fontSize: themes.Text.titleBar,
              fontWeight: '600',
              backgroundColor: '#fff',
              marginLeft: themes.Spacing.medium,
              alignSelf: 'center',
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
        value={note}
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
  header: {
    backgroundColor: '#FFFFFF',
    // shadowColor: '#333333',
    // shadowOffset: {width: -1, height: -3},
    // shadowRadius: 2,
    // shadowOpacity: 0.4,
    // elevation: 5,
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
});
export default connect(null, actions)(MenuFood);
