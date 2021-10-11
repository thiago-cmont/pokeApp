import React, {useEffect, useState} from 'react';

import {useContextSelector} from 'use-context-selector';

import PokemonFlatlist from '../../components/PokemonFlatlist';
import {PokemonContext} from '../../context/pokemonContext';
import * as S from './styles';

const PokemonList: React.FC = () => {
  const pokemonData = useContextSelector(PokemonContext, v => v.pokemonData);

  const getPokemonData = useContextSelector(
    PokemonContext,
    v => v.getPokemonData,
  );
  const [isLoading, setIsLoading] = useState(false);

  const LoadingIndicator = () => {
    return <S.LoadingIndicator />;
  };

  useEffect(() => {
    if (!pokemonData) {
      setIsLoading(true);
    }
    getPokemonData?.().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <S.LoadingWrapper>
          <LoadingIndicator />
        </S.LoadingWrapper>
      ) : (
        <PokemonFlatlist />
      )}
    </>
  );
};

export default PokemonList;
