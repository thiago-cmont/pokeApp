import Config from 'react-native-config';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

// eslint-disable-next-line import/no-mutable-exports
let reactotron;

if (__DEV__) {
  reactotron = Reactotron.configure({
    host: Config.REACTOTRON_IP,
  })
    .useReactNative()
    .use(reactotronRedux())
    .connect();

  reactotron.clear();
}

export {reactotron};
