import {Animated} from 'react-native';

import {s, vs} from 'react-native-size-matters';
import styled from 'styled-components/native';

import {SCREEN_HEIGHT} from '../../utils/dimensions';

export const SideTabContainer = styled(Animated.View)`
  width: ${s(200)}px;
  height: ${SCREEN_HEIGHT - vs(450)}px;
  left: 0;
  top: ${vs(450)}px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
`;
