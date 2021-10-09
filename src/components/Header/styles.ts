import styled from 'styled-components/native';

import {HEADER_HEIGHT} from '../../utils/dimensions';

export const HeaderContainer = styled.View`
  background-color: #fff;
  height: ${HEADER_HEIGHT}px;
  padding-left: 20px;
  align-items: center;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  font-size: 40px;
  color: #000;
  margin-right: 10px;
  font-family: 'league-gothic';
`;
