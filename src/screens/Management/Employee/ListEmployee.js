import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import CardItemEmployee from '../../../components/CardItemEmployee';
import {TitleBar} from '../../../components/TitleBar';
import themes from '../../../themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useEffect} from 'react';
import {findAllUser} from '../../../api/UserApi';
import convertPosition from '../../../utils/convertPositions';
import convertVie from '../../../utils/convertVie';

const data = [{}, {}, {}];

const ListEmployee = (props) => {
  const [users, setUsers] = useState([]);
  const [usersCoppy, setUsersCoppy] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const loadData = () => {
    setIsRefresh(true);
    findAllUser()
      .then((response) => {
        setUsers(response.data);
        setUsersCoppy(response.data);
        setIsRefresh(false);
      })
      .catch((error) => {
        setIsRefresh(false);
        console.log(error);
      });
  };

  const searchNameUser = (name) =>{
    if (name === '') {
        setUsers([...usersCoppy]);
        return;
    }  
    let listValue = [];
    let valueConvert = convertVie(name);
    users.map((item)=>{
        if(item.fullName.toUpperCase().includes(valueConvert.toUpperCase())){
            listValue.push(item);
        }
    });
    setUsers([...listValue]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TitleBar
        name="Danh sách nhân viên"
        eventButton={() => props.navigation.goBack()}
      />
      <View style={styles.searchView}>
        <Icon
          name="search"
          size={30}
          color={themes.Colors.primary}
          style={styles.iconStyle}
        />
        <TextInput style={styles.inputStyle} placeholder="Tìm kiếm nhân viên" onChangeText={(value)=> searchNameUser(value)} />
      </View>
      <FlatList
        style={{marginTop: themes.Spacing.medium}}
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <CardItemEmployee
            name={item.fullName}
            role={convertPosition(item.role)}
            email={item.email}
            urlImage={item.pathAvatar}
            eventButton={() =>
              props.navigation.navigate('addEmployee', {
                option: 'EDIT',
                user: item,
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={() => loadData()} />
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
    marginVertical: themes.Spacing.large,
  },
  iconStyle: {
    marginLeft: themes.Spacing.medium,
  },
  inputStyle: {
    width: '100%',
    marginLeft: themes.Spacing.medium,
  },
});

export default ListEmployee;
