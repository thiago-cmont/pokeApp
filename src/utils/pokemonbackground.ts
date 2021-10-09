import {POKEMON_TYPE_COLORS} from '../constants/pokemonColors';

const getTypeColor = (type: string): string =>
  POKEMON_TYPE_COLORS[String(type).toLowerCase()];

export default getTypeColor;
