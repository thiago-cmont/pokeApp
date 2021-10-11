import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';

import {useContextSelector} from 'use-context-selector';

import {SIDE_TABS} from '../../../constants/sideTabs';
import {PokemonContext} from '../../../context/pokemonContext';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import {SCREEN_WIDTH} from '../../../utils/dimensions';
import {SideTabContext} from '../context/sideTabContext';
import * as S from './styles';

const Moves: React.FC = () => {
  const [moves, setMoves] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const pokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.pokemonSpecies,
  );
  const pokemonSingle = useContextSelector(
    PokemonContext,
    v => v.pokemonSingle,
  );
  const getPokemonMoves = useContextSelector(
    PokemonContext,
    v => v.getPokemonMoves,
  );
  const tabAnimationController = useRef(new Animated.Value(0)).current;
  const tabOpacity = useRef(new Animated.Value(1)).current;
  const setIsTabOpenned = useContextSelector(
    SideTabContext,
    v => v.setIsTabOpenned,
  );
  const isTabOpenned = useContextSelector(SideTabContext, v => v.isTabOpenned);
  const setTabOpenned = useContextSelector(
    SideTabContext,
    v => v.setTabOpenned,
  );
  const tabOpenned = useContextSelector(SideTabContext, v => v.tabOpenned);

  const tabOpacityDecrease = () => {
    Animated.timing(tabOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const tabOpenAnimation = () => {
    Animated.timing(tabAnimationController, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      tabOpacityDecrease();
      setAnimationFinished(true);
    });
  };

  const clearStates = () => {
    setTabOpenned('');
    setIsTabOpenned(false);
  };

  const tabOpacityIncrease = () => {
    tabOpacity.setValue(0);
    Animated.timing(tabOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const tabCloseAnimation = () => {
    setAnimationFinished(false);
    Animated.timing(tabAnimationController, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      tabOpacityIncrease();
      clearStates();
    });
  };

  const pressHandler = () => {
    setIsTabOpenned(true);
    setTabOpenned(SIDE_TABS.MOVES);
    tabOpenAnimation();
  };

  const getMoves = async () => {
    const pokemonMoves = pokemonSingle?.abilities.map(({ability}) => {
      return {
        name: capitalizeFirstLetter(ability.name),
        url: ability.url,
      };
    });
    if (pokemonMoves) {
      await getPokemonMoves(pokemonMoves).then(res => setMoves(res));
    }
    return {
      moves: pokemonMoves,
    };
  };

  useEffect(() => {
    if (!moves && pokemonSingle && pokemonSpecies) {
      getMoves();
    }
  }, [moves, pokemonSpecies, pokemonSingle]);

  return (
    <>
      {tabOpenned === SIDE_TABS.MOVES && isTabOpenned ? (
        <S.MovesDisplay
          style={{
            width: tabAnimationController.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SCREEN_WIDTH],
            }),
          }}>
          {animationFinished && (
            <S.MovesContainer>
              {moves &&
                moves.map(move => (
                  <View key={move.name}>
                    <S.MovesText key={move.name}>
                      {capitalizeFirstLetter(move.name)} :
                    </S.MovesText>
                    <S.MovesDescription key={move.description}>
                      {capitalizeFirstLetter(move.description)}
                    </S.MovesDescription>
                  </View>
                ))}
            </S.MovesContainer>
          )}
          <S.MinimizeTab onPress={() => tabCloseAnimation()} name="left" />
        </S.MovesDisplay>
      ) : (
        <>
          {!isTabOpenned && (
            <S.Container
              style={{
                opacity: tabOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }}
              onPress={() => pressHandler()}>
              <S.TabLabel>Moves</S.TabLabel>
            </S.Container>
          )}
        </>
      )}
    </>
  );
};

export default Moves;
