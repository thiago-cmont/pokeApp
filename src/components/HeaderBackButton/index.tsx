import React from 'react';

import * as S from './styles';
import {HeaderBackButtonInterface} from './types';

const HeaderBackButton: React.FC<HeaderBackButtonInterface> = ({
  onPress = () => {},
}) => {
  return (
    <S.HeaderButtonWrapper onPress={onPress}>
      <S.HeaderButtonIcon
        accessibilityLabel="Botão de navegar de volta"
        name="arrow-back"
      />
    </S.HeaderButtonWrapper>
  );
};

export default HeaderBackButton;
