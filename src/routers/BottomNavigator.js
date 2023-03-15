import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import themes from '../themes';
import HomeDeskStaff from '../screens/DeskStaff/HomeDeskStaff';
import Profile from '../screens/Profile/Profile';
import Menu from '../screens/DeskStaff/Menu';
import {BillStackScreen} from './RootStackScreen';
import CustomIcon from '../components/CustomIcon';
import HomeKitchenStaff from '../screens/KitchenStaff/HomeKitchenStaff';
import MenuManagement from '../screens/Management/MenuManagement';
import EmployeeManager from '../screens/Management/EmployeeManager';
import StatisticManager from '../screens/Management/StatisticManager';

const Tabs = createBottomTabNavigator();
const BottomNavigationDeskStaff = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
        activeTintColor: themes.Colors.primary,
        inactiveTintColor: themes.Colors.dark_gray,
      }}>
      <Tabs.Screen
        name="bill"
        component={HomeDeskStaff}
        options={{
          tabBarLabel: 'Lập đơn hàng',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="list-alt" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        initialParams={{option: 'bottom', tableName: ''}}
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="book" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="listBills"
        component={BillStackScreen}
        options={{
          tabBarLabel: 'Hóa đơn',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="list-alt" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="user-o" focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const BottomNavigationKitchenStaff = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
        activeTintColor: themes.Colors.primary,
        inactiveTintColor: themes.Colors.dark_gray,
      }}>
      <Tabs.Screen
        name="bill"
        component={HomeKitchenStaff}
        options={{
          tabBarLabel: 'Món ăn đã gọi',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="list-alt" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        initialParams={{option: 'bottom', tableName: '', idOrder: 0, foodsOrder: [], status: ''}}
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="book" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="user-o" focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const BottomNavigationCashierStaff = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
        activeTintColor: themes.Colors.primary,
        inactiveTintColor: themes.Colors.dark_gray,
      }}>
      <Tabs.Screen
        name="bill"
        component={BillStackScreen}
        options={{
          tabBarLabel: 'Danh sách hóa đơn',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="list-alt" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="user-o" focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const BottomNavigationManagementStaff = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
        activeTintColor: themes.Colors.primary,
        inactiveTintColor: themes.Colors.dark_gray,
      }}>
      <Tabs.Screen
        name="menuManagement"
        component={MenuManagement}
        options={{
          tabBarLabel: 'Quản lý thực đơn',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="list-alt" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="employeeManager"
        initialParams={{option: 'bottom', tableName: ''}}
        component={EmployeeManager}
        options={{
          tabBarLabel: 'Quản lý nhân viên',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="user-plus" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="statisticManager"
        component={StatisticManager}
        options={{
          tabBarLabel: 'Báo cáo doanh thu',
          tabBarIcon: ({focused}) => (
            <CustomIcon name="bar-chart-o" focused={focused} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export {
  BottomNavigationDeskStaff,
  BottomNavigationKitchenStaff,
  BottomNavigationCashierStaff,
  BottomNavigationManagementStaff,
};
