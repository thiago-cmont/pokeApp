import {Platform, Dimensions} from 'react-native';

const HEADER_IOS = 44;
const HEADER_ANDROID = 56;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const HEADER_HEIGHT =
  Platform.OS === 'ios' ? HEADER_IOS : HEADER_ANDROID;
