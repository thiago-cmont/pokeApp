import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

import {s, vs} from 'react-native-size-matters';
import {useContextSelector} from 'use-context-selector';

import Sidetab from '../../components/SideTab';
import getPokedexNumber from '../../config/api/pokemon/helpers/getPokedexNumber';
import getPokemonImage from '../../config/api/pokemon/helpers/getPokemonImage';
import {PokemonContext} from '../../context/pokemonContext';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import {decimeterToMeter, hectogramsToKilograms} from '../../utils/conversion';
import * as S from './styles';

const PokemonSingles: React.FC = () => {
  const [size, setSize] = useState();
  const pokemonImageSize = useRef(new Animated.Value(0)).current;
  const pokemonSingle = useContextSelector(
    PokemonContext,
    v => v.pokemonSingle,
  );
  const pokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.pokemonSpecies,
  );
  const pokemonEvolutionChain = useContextSelector(
    PokemonContext,
    v => v.pokemonEvolutionChain,
  );

  const pokemonMoves = useContextSelector(PokemonContext, v => v.pokemonMoves);
  const getPokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.getPokemonSpecies,
  );

  const setPokemonSingle = useContextSelector(
    PokemonContext,
    v => v.setPokemonSingle,
  );
  const setPokemonSpecies = useContextSelector(
    PokemonContext,
    v => v.setPokemonSpecies,
  );

  const ImageSizeIncrease = () => {
    pokemonImageSize.setValue(0);
    Animated.timing(pokemonImageSize, {
      toValue: 1,
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
      ImageSizeIncrease?.();
    }
  }, [pokemonSpecies, pokemonMoves, pokemonEvolutionChain, pokemonSingle]);

  useEffect(() => {
    getPokemonSpecies?.(pokemonSingle?.id);
    return () => {
      setPokemonSingle(null);
      setPokemonSpecies(null);
    };
  }, [pokemonSingle]);

  return (
    <S.Container type={pokemonSingle?.types?.[0].type?.name}>
      <S.HeaderRowView>
        <S.PokemonName>
          {capitalizeFirstLetter(pokemonSingle?.name)}
        </S.PokemonName>
        <S.PokedexNumber>
          #{getPokedexNumber(pokemonSingle?.id)}
        </S.PokedexNumber>
      </S.HeaderRowView>
      <S.RowView>
        <S.PokemonImageWrapper
          style={{
            width: pokemonImageSize.interpolate({
              inputRange: [0, 1],
              outputRange: [150, vs(260)],
            }),
            height: pokemonImageSize.interpolate({
              inputRange: [0, 1],
              outputRange: [150, vs(260)],
            }),
          }}>
          <S.PokemonImage
            type={pokemonSingle?.types?.[0].type?.name}
            source={{uri: getPokemonImage(pokemonSingle?.id)}}
          />
        </S.PokemonImageWrapper>
        <S.PokemonSizeWrapper
          style={{
            opacity: pokemonImageSize.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}>
          <S.PokemonSizeRowView>
            <S.Height name="height" size={s(40)} />
            <S.PokemonSizeImage
              source={{uri: getPokemonImage(pokemonSingle?.id)}}
            />
          </S.PokemonSizeRowView>
          <S.PokemonSizeText>
            {decimeterToMeter(pokemonSingle?.height)}m
          </S.PokemonSizeText>
          <S.PokemonSizeRowView>
            <S.Weight name="scale" size={s(40)} />
            <S.PokemonSizeImage
              source={{uri: getPokemonImage(pokemonSingle?.id)}}
            />
          </S.PokemonSizeRowView>
          <S.PokemonSizeText>
            {hectogramsToKilograms(pokemonSingle?.weight)}kg
          </S.PokemonSizeText>
        </S.PokemonSizeWrapper>
      </S.RowView>
      <S.TypesRowView>
        {pokemonSingle?.types.map(type => (
          <S.Badges key={type?.type.name}>
            <S.BadgesDescription>
              {capitalizeFirstLetter(type?.type.name)}
            </S.BadgesDescription>
          </S.Badges>
        ))}
      </S.TypesRowView>
      <Sidetab />
    </S.Container>
  );
};

export default PokemonSingles;
