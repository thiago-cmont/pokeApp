import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../components/Header';
import HeaderBackButton from '../../components/HeaderBackButton';
import {MAIN_STACK} from '../../constants/routeNames';
import PokemonList from '../../pages/PokemonList';
import PokemonSingles from '../../pages/PokemonSingles';
import {Props} from './types';

const Stack = createStackNavigator();

const Main: React.FC<Props> = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name={MAIN_STACK.POKEMON_LIST}
      component={PokemonList}
      options={{header: () => <Header />}}
    />
    <Stack.Screen
      name={MAIN_STACK.POKEMON_SINGLES}
      component={PokemonSingles}
      options={{
        header: () => <HeaderBackButton onPress={() => navigation.pop()} />,
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);

export default Main;
