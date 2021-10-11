import {BaseType} from '../../../config/api/pokemon';

export interface PokemonCardParamsInterface {
  index: number;
  onPress: (name: string) => void;
  obj: BaseType;
}
