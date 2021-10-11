import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useContextSelector} from 'use-context-selector';

import {MAIN_STACK} from '../../constants/routeNames';
import {PokemonContext} from '../../context/pokemonContext';
import PokemonCard from './PokemonCard';
import * as S from './styles';

const PokemonFlatlist: React.FC = () => {
  const navigation = useNavigation();
  const getPokemonSingle = useContextSelector(
    PokemonContext,
    v => v.getPokemonSingle,
  );
  const pokemonData = useContextSelector(PokemonContext, v => v.pokemonData);

  const onPress = async obj => {
    if (obj) {
      await getPokemonSingle(obj).then(() =>
        navigation.navigate(MAIN_STACK.POKEMON_SINGLES),
      );
    }
  };

  const updatePokemonData = useContextSelector(
    PokemonContext,
    v => v.updatePokemonData,
  );

  const [isLoading, setIsLoading] = useState(false);

  const paginationHandler = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const newList = await updatePokemonData();
      if (newList) {
        setIsLoading(false);
      }
    }
  };

  const LoadingIndicator = () => {
    return isLoading ? <S.LoadingIndicator /> : null;
  };

  return (
    <S.Container>
      <S.List
        showsVerticalScrollIndicator={false}
        data={pokemonData}
        renderItem={({item, index}) => {
          return (
            <PokemonCard
              obj={item}
              index={index}
              onPress={() => onPress(item.name)}
            />
          );
        }}
        keyExtractor={item => item.id}
        onEndReached={paginationHandler}
        ListFooterComponent={LoadingIndicator}
        removeClippedSubviews
      />
    </S.Container>
  );
};
export default PokemonFlatlist;
