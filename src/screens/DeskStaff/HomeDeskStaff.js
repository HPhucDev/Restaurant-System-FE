import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import themes from '../../themes';
import Header from '../../components/Header';
import TopNavigation from '../../routers/TopNavigationFloors';
import {TitleBar} from '../../components/TitleBar';
import StatusBarCustom from '../../components/StatusBarCustom';

const HomeDeskStaff = ({navigation}) => {
  const handleUserButton = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarCustom />
      <TitleBar
        name="Lập đơn hàng"
        eventButton={navigation.goBack}
      />
      <Header
        name="Hoàng Nguyễn"
        position="Nhân viên phục vụ bàn"
        eventButton={() => handleUserButton()}
      />
      <TopNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.Colors.white,
  },
});
export default HomeDeskStaff;
