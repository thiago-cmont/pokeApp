import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

import {useContextSelector} from 'use-context-selector';

import {PokemonContext} from '../../../context/pokemonContext';
import {SCREEN_WIDTH} from '../../../utils/dimensions';
import {SideTabContext} from '../context/sideTabContext';
import * as S from './styles';

const Trivia: React.FC = () => {
  const [trivia, setTrivia] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const pokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.pokemonSpecies,
  );
  const pokemonSingle = useContextSelector(
    PokemonContext,
    v => v.pokemonSingle,
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
    setTabOpenned('trivia');
    tabOpenAnimation();
  };

  const getTrivia = () => {
    const TriviaTextIndex = pokemonSpecies?.flavor_text_entries.findIndex(
      text =>
        text.version.name === 'ruby' ||
        text.version.name === 'platinum' ||
        text.version.name === 'soulsilver',
    );
    return {
      triviaIndex: TriviaTextIndex,
    };
  };

  useEffect(() => {
    if (!trivia && pokemonSingle && pokemonSpecies) {
      setTrivia(getTrivia());
    }
  }, [trivia, pokemonSpecies, pokemonSingle]);

  return (
    <>
      {tabOpenned === 'trivia' && isTabOpenned ? (
        <S.TriviaDisplay
          style={{
            width: tabAnimationController.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SCREEN_WIDTH],
            }),
          }}>
          {animationFinished && (
            <S.TriviaContainer>
              <S.TriviaText>
                {
                  pokemonSpecies?.flavor_text_entries[trivia.triviaIndex]
                    .flavor_text
                }
              </S.TriviaText>
            </S.TriviaContainer>
          )}
          <S.MinimizeTab onPress={() => tabCloseAnimation()} name="left" />
        </S.TriviaDisplay>
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
              <S.TabLabel>Trivia</S.TabLabel>
            </S.Container>
          )}
        </>
      )}
    </>
  );
};

export default Trivia;
