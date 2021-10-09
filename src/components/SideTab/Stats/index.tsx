import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

import {useContextSelector} from 'use-context-selector';

import {PokemonContext} from '../../../context/pokemonContext';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import {SCREEN_WIDTH} from '../../../utils/dimensions';
import {SideTabContext} from '../context/sideTabContext';
import * as S from './styles';

const Stats: React.FC = () => {
  const [stats, setStats] = useState(null);
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
    setTabOpenned('stats');
    tabOpenAnimation();
  };

  const getStats = async () => {
    Promise.all(
      pokemonSingle?.stats.map(stat => {
        let name = '';

        if (stat.stat.name === 'hp') {
          name = 'HP';
        } else if (stat.stat.name === 'attack') {
          name = 'Attack';
        } else if (stat.stat.name === 'defense') {
          name = 'Defense';
        } else if (stat.stat.name === 'special-attack') {
          name = 'Sp. Atk';
        } else if (stat.stat.name === 'special-defense') {
          name = 'Sp. Def';
        } else if (stat.stat.name === 'speed') {
          name = 'Speed';
        }
        return {
          base_stat: stat.base_stat,
          name,
          url: stat.stat.url,
        };
      }),
    ).then(res => setStats(res));
  };

  useEffect(() => {
    if (!stats && pokemonSingle && pokemonSpecies) {
      setStats(getStats());
    }
  }, [stats, pokemonSpecies, pokemonSingle]);

  return (
    <>
      {tabOpenned === 'stats' && isTabOpenned ? (
        <S.StatsDisplay
          style={{
            width: tabAnimationController.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SCREEN_WIDTH],
            }),
          }}>
          {animationFinished && (
            <S.StatsContainer>
              {stats &&
                stats.map(stat => (
                  <S.RowView key={stat.name}>
                    <S.StatsText key={stat.name}>
                      {capitalizeFirstLetter(stat.name)} :
                    </S.StatsText>
                    <S.StatsDescription key={stat.base_stat}>
                      {capitalizeFirstLetter(stat.base_stat)}
                    </S.StatsDescription>
                  </S.RowView>
                ))}
            </S.StatsContainer>
          )}
          <S.MinimizeTab onPress={() => tabCloseAnimation()} name="left" />
        </S.StatsDisplay>
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
              <S.TabLabel>Stats</S.TabLabel>
            </S.Container>
          )}
        </>
      )}
    </>
  );
};

export default Stats;
