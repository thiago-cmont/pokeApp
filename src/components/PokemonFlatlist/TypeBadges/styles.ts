import {s} from 'react-native-size-matters';
import styled from 'styled-components/native';

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
