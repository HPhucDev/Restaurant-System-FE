import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import themes from '../themes';
import FloorsOne from '../screens/Floors/FloorsOne'
import FloorSecond from '../screens/Floors/FloorSecond';
const Tab = createMaterialTopTabNavigator();

const TopNavigationFloors = () => {
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
          {/* <Tab.Screen name="floor" component={Floors} options={{tabBarLabel: 'Tất cả tầng'}} /> */}
          <Tab.Screen name="floor1" component={FloorsOne} options={{tabBarLabel: 'Tầng 1'}} />
          <Tab.Screen name="floor2" component={FloorSecond} options={{tabBarLabel: 'Tầng 2'}} />
      </Tab.Navigator>
  );
};
export default TopNavigationFloors;
