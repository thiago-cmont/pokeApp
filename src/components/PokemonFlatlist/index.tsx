import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useContextSelector} from 'use-context-selector';

import {MAIN_STACK} from '../../constants/routeNames';
import {PokemonContext} from '../../context/pokemonContext';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import * as S from './styles';
import {PokemonFlatlistbaseType} from './types';

const PokemonFlatlist: React.FC<PokemonFlatlistbaseType> = ({dataToList}) => {
  const navigation = useNavigation();
  const getPokemonSingle = useContextSelector(
    PokemonContext,
    v => v.getPokemonSingle,
  );

  const onPress = async obj => {
    if (obj) {
      await getPokemonSingle(obj).then(() =>
        navigation.navigate(MAIN_STACK.POKEMON_SINGLES),
      );
    }
  };

  const pokemonData = useContextSelector(PokemonContext, v => v.pokemonData);
  const setPokemonData = useContextSelector(
    PokemonContext,
    v => v.setPokemonData,
  );
  const getPokemonData = useContextSelector(
    PokemonContext,
    v => v.getPokemonData,
  );
  const [offset, setOffset] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const offsetHandler = async () => {
    setIsLoading(true);
    const newList = await getPokemonData(offset);
    if (newList) {
      const newPokemonList = pokemonData;
      newPokemonList.push(...newList);
      setPokemonData(newPokemonList);
      setOffset(offset + 20);
      setIsLoading(false);
    }
  };

  const TypesBadges = ({types}) => {
    return (
      <>
        {types &&
          types.map(type => (
            <S.Badges key={type?.type.name}>
              <S.BadgesDescription>
                {capitalizeFirstLetter(type?.type.name)}
              </S.BadgesDescription>
            </S.Badges>
          ))}
      </>
    );
  };
  const Item = ({obj, index}) => {
    return (
      <>
        <S.ButtonWrapper
          onPress={() => onPress(obj?.name)}
          type={obj?.type?.[0].type.name}>
          {index % 2 === 0 ? (
            <>
              <S.Pokemon source={{uri: obj?.image}} />
              <S.ColumnView>
                <S.ButtonTitle name={obj?.name}>
                  {capitalizeFirstLetter(obj?.name)} #{obj.pokedexNumber}
                </S.ButtonTitle>
                <S.RowView>
                  <TypesBadges types={obj?.type} />
                </S.RowView>
              </S.ColumnView>
            </>
          ) : (
            <>
              <S.ColumnView>
                <S.ButtonTitle name={obj?.name}>
                  {capitalizeFirstLetter(obj?.name)} #{obj.pokedexNumber}
                </S.ButtonTitle>
                <S.RowView>
                  <TypesBadges types={obj?.type} />
                </S.RowView>
              </S.ColumnView>
              <S.Pokemon source={{uri: obj?.image}} />
            </>
          )}
        </S.ButtonWrapper>
      </>
    );
  };

  const renderItem = (item, index) => <Item obj={item} index={index} />;

  const LoadingIndicator = () => {
    return <S.LoadingIndicator />;
  };

  return (
    <S.Container>
      <S.List
        showsVerticalScrollIndicator={false}
        data={dataToList}
        renderItem={({item, index}) => renderItem(item, index)}
        key={item => item.id}
        onEndReached={() => offsetHandler()}
      />
      {isLoading && <LoadingIndicator />}
    </S.Container>
  );
};
export default PokemonFlatlist;
