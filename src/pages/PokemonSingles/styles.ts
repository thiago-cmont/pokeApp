import {Animated} from 'react-native';

import {s, vs} from 'react-native-size-matters';
import ScaleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeightIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import getTypeColor from '../../utils/pokemonbackground';

export const Container = styled.View`
  flex: 1;
  background-color: ${({type}) => getTypeColor(type)};
  align-items: center;
  padding-top: ${s(45)}px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const HeaderRowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PokemonName = styled.Text`
  color: #fff;
  font-size: ${vs(30)}px;
  font-weight: bold;
`;

export const PokedexNumber = styled.Text`
  color: #fff;
  font-size: ${vs(20)}px;
  font-weight: bold;
`;

export const PokemonImageWrapper = styled(Animated.View)`
  background-color: #ffffff33;
  border-radius: 300px;
  margin-top: 20px;
  align-self: flex-start;
`;

export const PokemonImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
`;

export const PokemonSizeImage = styled.Image.attrs({
  tintColor: '#000',
})`
  width: ${s(40)}px;
  height: 100%;
`;

export const PokemonSizeWrapper = styled(Animated.View)`
  flex-direction: column;
  height: 100%;
  padding-top: ${vs(60)}px;
  align-items: center;
  padding-left: 15px;
`;

export const PokemonSizeRowView = styled.View`
  height: ${vs(50)}px;
  flex-direction: row;
`;

export const PokemonSizeText = styled.Text`
  font-size: ${vs(20)}px;
  font-weight: bold;
  color: #000;
`;

export const Height = styled(HeightIcon)`
  color: #000;
  width: ${s(40)}px;
  height: 100%;
`;
export const Weight = styled(ScaleIcon)`
  color: #000;
  width: ${s(40)}px;
  height: 100%;
`;
export const TypesRowView = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  width: ${s(200)}px;
  justify-content: center;
`;
export const Badges = styled.View`
  background-color: #ffffff33;
  border-radius: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-right: 10px;
  padding-left: 10px;
`;

export const BadgesDescription = styled.Text`
  font-size: ${vs(20)}px;
  font-weight: bold;
  color: #ffff;
`;

export const RowView = styled.View`
  flex-direction: row;
`;
