import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';

import {useContextSelector} from 'use-context-selector';

import {PokemonContext} from '../../../context/pokemonContext';
import {SCREEN_WIDTH} from '../../../utils/dimensions';
import {SideTabContext} from '../context/sideTabContext';
import * as S from './styles';
import {EvolutionsComponentType} from './types';

const EvolutionChain: React.FC = () => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [animationFinished, setAnimationFinished] = useState(false);
  const pokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.pokemonSpecies,
  );
  const getPokemonEvolutionChain = useContextSelector(
    PokemonContext,
    v => v.getPokemonEvolutionChain,
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
    setTabOpenned('evolution');
    tabOpenAnimation();
  };

  useEffect(() => {
    if (!evolutionChain && pokemonSpecies) {
      getPokemonEvolutionChain(pokemonSpecies?.evolution_chain.url).then(
        res => {
          setEvolutionChain(res[0]);
        },
      );
    }
  }, [evolutionChain, pokemonSpecies, pokemonSingle]);

  const Evolutions: React.FC<EvolutionsComponentType> = ({
    firstImage,
    firstName,
    secondImage,
    secondName,
    minLevel,
  }) => {
    return (
      <>
        <S.EvolutionsContainer>
          <S.Pokemon>
            <S.PokemonImage source={{uri: firstImage}} />
            <S.LevelText>{firstName}</S.LevelText>
          </S.Pokemon>

          <S.MinLevel>
            <S.EvolutionArrowIcon name="arrowright" />
            <S.LevelText>Lvl {minLevel}</S.LevelText>
          </S.MinLevel>

          <S.Pokemon>
            <S.PokemonImage source={{uri: secondImage}} />
            <S.LevelText>{secondName}</S.LevelText>
          </S.Pokemon>
        </S.EvolutionsContainer>
      </>
    );
  };

  return (
    <>
      {tabOpenned === 'evolution' && isTabOpenned ? (
        <S.EvolutionDisplay
          style={{
            width: tabAnimationController.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SCREEN_WIDTH],
            }),
          }}>
          <S.MinimizeTab onPress={() => tabCloseAnimation()} name="left" />
          {(evolutionChain?.FirstEvolution ||
            evolutionChain?.SecondEvolution) &&
            animationFinished && (
              <View>
                {evolutionChain?.FirstEvolution && (
                  <Evolutions
                    firstImage={evolutionChain?.BaseForm.image}
                    firstName={evolutionChain?.BaseForm.name}
                    secondName={evolutionChain?.FirstEvolution.name}
                    secondImage={evolutionChain?.FirstEvolution.image}
                    minLevel={evolutionChain?.FirstEvolution.min_level}
                  />
                )}

                {evolutionChain?.SecondEvolution && (
                  <Evolutions
                    firstImage={evolutionChain?.FirstEvolution.image}
                    firstName={evolutionChain?.FirstEvolution.name}
                    secondName={evolutionChain?.SecondEvolution.name}
                    secondImage={evolutionChain?.SecondEvolution.image}
                    minLevel={evolutionChain?.SecondEvolution.min_level}
                  />
                )}
              </View>
            )}
        </S.EvolutionDisplay>
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
              <S.TabLabel>Evolution</S.TabLabel>
            </S.Container>
          )}
        </>
      )}
    </>
  );
};

export default EvolutionChain;
