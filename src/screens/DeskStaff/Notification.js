import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import themes from '../../themes';
import Icon from 'react-native-vector-icons/FontAwesome';

const data = [
  {
    title: 'Món ăn bàn số 1 đã chuyển xuống bếp',
    iconName: 'angle-double-right',
    decription: 'Món ăn đã chuyển thành công, đang chờ bếp xác nhận',
    time:"19:85:02  24/03/2021",
    status: 1,
  },
  {
    title: 'Bếp đã chấp nhận đơn của bàn số 1',
    iconName: 'angle-double-right',
    decription: 'Món ăn bàn số 1 đang được bếp nấu',
    time:"19:85:02  24/03/2021",
    status: 2,
  },
  {
    title: 'Món ăn của bàn số 1 đã hết',
    iconName: 'remove',
    decription: 'Món ăn bàn số 1 đã hết, vui lòng liên hệ lại khách',
    time:"19:85:02  24/03/2021",
    status: 3,
  },
  {
    title: 'Món ăn của bàn số 1 hoàn thành',
    iconName: 'check',
    decription: 'Món ăn bàn số 1 đã hoàn thành, vui lòng mang lên cho khách',
    time:"19:85:02  24/03/2021",
    status: 4,
  },
];

const Notification = () => {
  const handleUserButton = () => {};

  const CardNotification = (props) => {
    return (
      <TouchableOpacity style={styles.notificationCardView}>
        <Icon
          style={styles.iconNotification}
          size={30}
          color={props.color}
          name={props.iconName}
        />
        <View style={styles.contentCardText}>
          <Text style={styles.textStyle}>{props.title}</Text>
          <Text style={[styles.textStyle, styles.decriptionText]}>
            {props.decription}
          </Text>
          <Text style={{marginTop: themes.Spacing.medium}}>{props.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name="Hoàng Nguyễn"
        position="Nhân viên phục vụ bàn"
        eventButton={() => handleUserButton()}
      />
      <View style={styles.notificationView}>
        <Text style={styles.notificationText}>Danh sách thông báo</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <CardNotification
            iconName={item.iconName}
            title={item.title}
            decription={item.decription}
            time={item.time}
            color={item.status === 1 || item.status === 2 ? themes.Colors.link : item.status === 3 ? themes.Colors.danger : themes.Colors.done}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
  notificationView: {
    marginTop: themes.Spacing.large,
    marginHorizontal: themes.Spacing.large,
    borderBottomWidth: 0.5,
    borderBottomColor: themes.Colors.dark_gray,
  },
  notificationText: {
    fontSize: themes.Text.titleBar,
    color: themes.Colors.black,
    fontWeight: 'bold',
  },
  notificationCardView: {
    flexDirection: 'row',
    marginHorizontal: themes.Spacing.medium,
    marginVertical: themes.Spacing.medium,
    backgroundColor: themes.Colors.white,
    borderRadius: 10,
    elevation: 5,
    height: 100,
  },
  contentCardText: {
    marginLeft: 40,
    marginRight: 10
  },
  iconNotification: {
    position: 'absolute',
    left: themes.Spacing.medium,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: themes.Colors.lable_text,
  },
  decriptionText: {
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize: themes.Text.dateItem,
  },
});
export default Notification;
