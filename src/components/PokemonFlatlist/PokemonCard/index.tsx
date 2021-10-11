import React from 'react';

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import TypesBadges from '../TypeBadges';
import * as S from './styles';
import {PokemonCardParamsInterface} from './types';

const PokemonCard: React.FC<PokemonCardParamsInterface> = ({
  obj,
  index,
  onPress,
}) => {
  return (
    <>
      <S.ButtonWrapper
        onPress={() => onPress(obj?.name)}
        type={obj?.type?.[0].type.name}>
        {index % 2 === 0 ? (
          <>
            <S.Pokemon key={obj.id} source={{uri: obj?.image}} />
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

export default React.memo(PokemonCard);
