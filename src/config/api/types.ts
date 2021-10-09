import {AxiosInstance} from 'axios';

import {CreatePokemonListInterface} from './pokemon/types';

export interface APIMethodsInterface {
  pokemonList: CreatePokemonListInterface;
}

export interface APIInterface {
  instance: AxiosInstance;
  methods: APIMethodsInterface;
}
