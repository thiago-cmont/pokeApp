import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import PokemonContextProvider from './src/context/pokemonContext';
import PokeApp from './src/navigations/index';
import RootTheme from './src/themes/RootTheme';

if (__DEV__) {
  import('./src/config/ReactotronConfig');
}

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <RootTheme>
      <PokemonContextProvider>
        <PokeApp />
      </PokemonContextProvider>
    </RootTheme>
  );
};

export default App;
