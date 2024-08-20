import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store} from './Source/Components/Redux/Store';
import StackNav from './Source/Components/StackScreen/StackNav';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './Source/Screens/NoInternet';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      {isConnected ? <StackNav /> : <NoInternet />}
    </Provider>
  );
};

export default App;
