import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

import {s} from 'react-native-size-matters';
import {useContextSelector} from 'use-context-selector';

import {PokemonContext} from '../../context/pokemonContext';
import {SCREEN_WIDTH} from '../../utils/dimensions';
import SideTabContextProvider from './context/sideTabContext';
import EvolutionChain from './EvolutionChain';
import Moves from './Moves';
import Stats from './Stats';
import * as S from './styles';
import Trivia from './Trivia';

const Sidetab: React.FC = () => {
  const tabWidth = useRef(new Animated.Value(1)).current;
  const pokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.pokemonSpecies,
  );
  const pokemonSingle = useContextSelector(
    PokemonContext,
    v => v.pokemonSingle,
  );
  const pokemonEvolutionChain = useContextSelector(
    PokemonContext,
    v => v.pokemonEvolutionChain,
  );

  const pokemonMoves = useContextSelector(PokemonContext, v => v.pokemonMoves);

  const tabWidthDecrease = () => {
    Animated.timing(tabWidth, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    if (
      pokemonSpecies &&
      pokemonMoves &&
      pokemonEvolutionChain &&
      pokemonSingle
    ) {
      tabWidthDecrease();
    }
  }, [pokemonSpecies, pokemonMoves, pokemonEvolutionChain, pokemonSingle]);

  return (
    <SideTabContextProvider>
      <S.SideTabContainer
        style={{
          width: tabWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [s(90), SCREEN_WIDTH],
          }),
        }}>
        <EvolutionChain />
        <Moves />
        <Stats />
        <Trivia />
      </S.SideTabContainer>
    </SideTabContextProvider>
  );
};

export default Sidetab;
