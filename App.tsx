import React from 'react';


import MarkerDispatchContextContainer from './MarkerDispatchContext';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';



const App = () => {
  return (
    <NavigationContainer>
      <MarkerDispatchContextContainer />
    </NavigationContainer>
  );
};


export default App;
