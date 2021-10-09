import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MAIN_STACK} from '../constants/routeNames';
import Main from './stackNavigators/Main';

const Stack = createStackNavigator();

const PokeApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={MAIN_STACK.POKEMON} component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PokeApp;
