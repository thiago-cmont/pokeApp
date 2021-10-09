import {vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

export const HeaderButtonWrapper = styled.TouchableOpacity`
  margin-top: ${vs(10)}px;
  padding-left: 15px;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const HeaderButtonIcon = styled(Icon).attrs({
  color: '#FFF',
  size: vs(30),
})``;
