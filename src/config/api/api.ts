import Axios from 'axios';

import createPokemonData from './pokemon';
import {APIInterface, APIMethodsInterface} from './types';

function createApi() {
  const api: APIInterface = {
    instance: Axios.create({
      baseURL: 'https://pokeapi.co/api/v2/',
      timeout: 5000,
    }),
    methods: {} as APIMethodsInterface,
  };

  // endpoits declaration
  api.methods.pokemonList = createPokemonData(api.instance);

  return api;
}

export default createApi();

export * from './types';
