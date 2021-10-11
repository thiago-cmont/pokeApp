import {
  BaseType,
  MovesPokemonType,
  MovesRequestReturnType,
  PokemonEvolutionChainDataType,
  PokemonEvolutionChainInterface,
  PokemonListDataType,
  PokemonSepeciesDataType,
  PokemonSingleDataType,
  PokemonSingleInterface,
  PokemonSpeciesInterface,
} from '../../config/api/pokemon';

export interface PokemonContextInterface {
  pokemonData: BaseType[] | null;
  pokemonSingle: PokemonSingleInterface | null;
  pokemonSpecies: PokemonSpeciesInterface | null;
  pokemonEvolutionChain: PokemonEvolutionChainInterface | null;
  pokemonMoves: MovesPokemonType[] | null;
  setPokemonSingle: React.Dispatch<any>;
  setPokemonData: React.Dispatch<any>;
  setPokemonSpecies: React.Dispatch<any>;
  setPokemonEvolutionChain: React.Dispatch<any>;
  setPokemonMoves: React.Dispatch<any>;
  getPokemonData: () => PokemonListDataType;
  getPokemonSingle: (value: number | string) => PokemonSingleDataType;
  getPokemonSpecies: (value: number | string) => PokemonSepeciesDataType;
  getPokemonEvolutionChain: (value: string) => PokemonEvolutionChainDataType;
  getPokemonMoves: (value: BaseType[]) => Promise<MovesRequestReturnType[]>;
  updatePokemonData: (offset?: number) => PokemonListDataType;
}
