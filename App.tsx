import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import PokemonContextProvider from './src/context/pokemonContext';
import PokeApp from './src/navigations/index';

if (__DEV__) {
  import('./src/config/ReactotronConfig');
}

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <PokemonContextProvider>
      <PokeApp />
    </PokemonContextProvider>
  );
};

export default App;
