import {Animated, TouchableOpacity} from 'react-native';

import {s, vs} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export const Container = styled(AnimatedTouchable)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: ${vs(40)}px;
  background-color: #fff;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border: 1px solid #c6c6c6;
`;

export const TabLabel = styled.Text`
  font-size: ${vs(20)}px;
  font-weight: bold;
`;

export const MovesDisplay = styled(Animated.View)`
  background-color: #ffff;
  position: absolute;
  height: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const MinimizeTab = styled(Icon).attrs({
  size: vs(25),
})`
  position: absolute;
  right: ${s(10)}px;
  top: ${vs(15)}px;
`;

export const MovesContainer = styled.View`
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

export const MovesText = styled.Text`
  color: #000;
  font-size: ${vs(18)}px;
  text-align: left;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: center;
`;

export const MovesDescription = styled.Text`
  color: #000;
  font-size: ${vs(18)}px;
  text-align: center;
`;
