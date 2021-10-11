import {s, vs} from 'react-native-size-matters';
import styled from 'styled-components/native';

import {SCREEN_WIDTH} from '../../../utils/dimensions';
import getTypeColor from '../../../utils/pokemonbackground';

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

export const ButtonTitle = styled.Text`
  font-size: ${({name}) => (name?.length > 9 ? s(22) : s(25))}px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.white};
  text-align: center;
`;

export const Pokemon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${s(120)}px;
  height: 100%;
`;
