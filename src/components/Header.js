import React from 'react';
import themes from '../themes';
import {StyleSheet, View, Text, Image} from 'react-native';
import * as actions from '../redux/actions';
import {connect} from 'react-redux';

const Header = (props) => {
  const converPosition = (roles) => {
    let role = '';

    switch (roles) {
      case 'DESK_STAFF':
        role = 'Nhân viên phục vụ bàn';
        break;
      case 'KITCHEN_STAFF':
        role = 'Nhân viên bếp';
        break;
      case 'CASHIER_STAFF':
        role = 'Nhân viên bếp';
        break;
      case 'MANAGER':
        role = 'Quản lý';
        break;
      default:
        role = 'Nhân viên phục vụ bàn';
        break;
    }
    return role;
  };
  return (
    <View style={styles.headerView}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.nameUserText}>{props.user.fullName}</Text>
        <View
          style={styles.userButtonStyle}
          onPress={() => props.eventButton()}>
          <Image
            style={styles.userImage}
            source={{
              uri: props.user.pathAvatar,
            }}
          />
        </View>
      </View>
      <Text style={styles.positionText}>
        {converPosition(props.user.role)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    marginTop: themes.Spacing.large,
    marginHorizontal: themes.Spacing.large,
  },
  nameUserText: {
    fontSize: themes.Text.titleText,
    fontWeight: 'bold',
    marginLeft: 2,
    color: themes.Colors.black,
  },
  userButtonStyle: {
    borderRadius: 25,
    position: 'absolute',
    right: 0,
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  positionText: {
    fontSize: themes.Text.dateText,
    color: themes.Colors.dark_gray,
    marginTop: themes.Spacing.medium,
  },
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, actions)(Header);
