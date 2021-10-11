import React from 'react';

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import * as S from './styles';
import {TypesObjectInterface} from './types';

const TypesBadges: React.FC<TypesObjectInterface> = ({types}) => {
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

export default TypesBadges;
