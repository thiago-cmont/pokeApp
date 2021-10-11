import React from 'react';

import {ThemeProvider} from 'styled-components/native';

import colors from '../colors';

const RootTheme = ({children}) => {
  // Combina propriedades de tema
  const combinedTheme = {
    ...colors,
  };
  console.log(combinedTheme);
  return <ThemeProvider theme={combinedTheme}>{children}</ThemeProvider>;
};

export default RootTheme;
