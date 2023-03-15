import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import themes from '../themes';
import MenuFood from '../screens/Menu/MenuFood';
import MenuBeverages from '../screens/Menu/MenuBeverages';
const Tab = createMaterialTopTabNavigator();

const TopNavigationMenu = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: themes.Colors.primary,
        inactiveTintColor: themes.Colors.dark_gray,
        indicatorStyle: {
          backgroundColor: themes.Colors.primary,
        },
        labelStyle: {
          textTransform: 'none',
          fontSize: themes.Text.titleBar,
          fontWeight: '500',
        },
      }}>
          <Tab.Screen name="menuFood" initialParams={{option: props.option, tableName: props.tableName}} component={MenuFood} options={{tabBarLabel: 'Menu Món'}} />
          <Tab.Screen name="menuBeverages" initialParams={{option: props.option, tableName: props.tableName}} component={MenuBeverages} options={{tabBarLabel: 'Menu Nước'}} />
      </Tab.Navigator>
  );
};
export default TopNavigationMenu;
