import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './src/routers/RootStackScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {LogBox} from 'react-native';
Icon.loadFont();
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
    // <BillDocument/>
  );
};
export default App;
