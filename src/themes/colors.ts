const colors = {
  white: '#FFFFFF',
  black: '#000000',
  opaqueBackground: '#ffffff66',
  border: '#c6c6c6',
} as const;

export default {colors};

export type ColorsKeysType = keyof typeof colors;
export type ColorsValuesType = typeof colors[ColorsKeysType];
