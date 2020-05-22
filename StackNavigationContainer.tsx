import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import CreateMarkerScreen from './screens/CreateMarkerScreen';

export type RootStackParamList = {
  MapScreen: undefined; // route가 param을 필요로 하지 않음
  CreateMarkerScreen: undefined; // route가 param을 필요로 하지 않음
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigationContainer: React.FC<{}> = (props) => {
  return (
    <Stack.Navigator initialRouteName="MapScreen">
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateMarkerScreen"
        component={CreateMarkerScreen}
        options={{
          headerTitle: '추가'
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigationContainer;
