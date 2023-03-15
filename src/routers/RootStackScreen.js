import React from 'react';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SignInScreen from '../screens/Authentification/SignInScreen';
import ForgotPassword from '../screens/Authentification/ForgotPassword';
import NewPassword from '../screens/Authentification/NewPassword';
import FunctionStaff from '../screens/Function/FunctionStaff';
import Menu from '../screens/DeskStaff/Menu';
import Invoice from '../screens/DeskStaff/Invoice';
import FoodDetail from '../screens/KitchenStaff/FoodDetail';
import Bills from '../screens/Bill/Bills';
import BillDocument from '../screens/Bill/BillDocument';
import {
  BottomNavigationDeskStaff,
  BottomNavigationCashierStaff,
  BottomNavigationKitchenStaff,
  BottomNavigationManagementStaff,
} from '../routers/BottomNavigator';
import PairingTable from '../screens/DeskStaff/PairingTable';
import DetachedTable from '../screens/DeskStaff/DetachedTable';
import AddFoodItem from '../screens/Management/FoodItem/AddFoodItem';
import AddEmployee from '../screens/Management/Employee/AddEmployee';
import ListFoodItem from '../screens/Management/FoodItem/ListFoodItem';
import ListEmployee from '../screens/Management/Employee/ListEmployee';
import ListOrder from '../screens/Management/Statistic/ListOrder';
import OrderDetail from '../screens/Management/Statistic/OrderDetail';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    {/* Authentification */}
    <RootStack.Screen
      name="signInScreen"
      component={SignInScreen}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
    <RootStack.Screen
      name="forgotPassword"
      component={ForgotPassword}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
    <RootStack.Screen
      name="newPassword"
      component={NewPassword}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
    {/* Function Staff */}
    <RootStack.Screen
      name="functionStaff"
      component={FunctionStaff}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
    <RootStack.Screen
      name="bills"
      component={BillStackScreen}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* Desk Staff */}
    <RootStack.Screen
      name="invoice"
      component={Invoice}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    <RootStack.Screen
      name="pairingTable"
      component={PairingTable}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    <RootStack.Screen
      name="detachedTable"
      component={DetachedTable}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    <RootStack.Screen
      name="menu"
      component={Menu}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
    {/* Main Screen */}
    <RootStack.Screen
      name="mainDeskStaff"
      component={BottomNavigationDeskStaff}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* KitChenStaff */}
    <RootStack.Screen
      name="mainKitChenStaff"
      component={BottomNavigationKitchenStaff}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
    <RootStack.Screen
      name="foodDetail"
      component={FoodDetail}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* CashierStaff */}
    <RootStack.Screen
      name="mainCashierStaff"
      component={BottomNavigationCashierStaff}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* Management */}
    <RootStack.Screen
      name="managementStaff"
      component={BottomNavigationManagementStaff}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* FoodItem */}
    <RootStack.Screen
      name="addFoodItem"
      component={AddFoodItem}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* AddEmployee */}
    <RootStack.Screen
      name="addEmployee"
      component={AddEmployee}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* ListFoodItem */}
    <RootStack.Screen
      name="listFoodItem"
      component={ListFoodItem}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* ListEmployee */}
    <RootStack.Screen
      name="listEmployee"
      component={ListEmployee}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* ListEmployee */}
    <RootStack.Screen
      name="listOrder"
      component={ListOrder}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

    {/* OrderDetail */}
    <RootStack.Screen
      name="orderDetail"
      component={OrderDetail}
      options={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />

  </RootStack.Navigator>
);

const BillStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="listBill"
        component={Bills}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <RootStack.Screen
        name="billDocument"
        component={BillDocument}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </RootStack.Navigator>
  );
};

export {RootStackScreen, BillStackScreen};
