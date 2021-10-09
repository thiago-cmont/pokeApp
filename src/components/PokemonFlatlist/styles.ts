import {s, vs} from 'react-native-size-matters';
import styled from 'styled-components/native';

import {SCREEN_WIDTH} from '../../utils/dimensions';
import getTypeColor from '../../utils/pokemonbackground';

export const ButtonWrapper = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  width: ${SCREEN_WIDTH * 0.9}px;
  height: ${vs(150)}px;
  margin-bottom: 2px;
  margin-bottom: 8px;
  background-color: ${({type}) => getTypeColor(type)};
  flex-direction: row;
  justify-content: space-around;
  border-radius: 20px;
`;

export const RowView = styled.View`
  flex-direction: row;
`;

export const ColumnView = styled.View`
  flex-direction: column;
  align-items: center;
`;
export const Badges = styled.View`
  background-color: #ffffff66;
  border-radius: 5px;
  padding: 2px;
  width: ${s(75)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
`;

export const BadgesDescription = styled.Text`
  color: #fff;
  font-size: ${s(18)}px;
  font-weight: bold;
`;

export const ButtonTitle = styled.Text`
  font-size: ${({name}) => (name?.length > 9 ? s(22) : s(25))}px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const Pokemon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${s(120)}px;
  height: 100%;
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#6890F0',
})`
  margin-bottom: 10px;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fff;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
})`
  flex-grow: 1;
  width: 100%;
  flex: 1;
`;
