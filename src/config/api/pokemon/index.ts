import {AxiosInstance} from 'axios';
import reactotron from 'reactotron-react-native';

import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import getPokedexNumber from './helpers/getPokedexNumber';
import getPokemonEvolutionChainId from './helpers/getPokemonEvolutionChainId';
import getPokemonIdFromUrl from './helpers/getPokemonId';
import getPokemonImage from './helpers/getPokemonImage';
import {
  CreatePokemonListInterface,
  PokemonListInterface,
  PokemonSingleDataType,
  PokemonListDataType,
  PokemonSingleInterface,
  BaseType,
  MovesRequestReturnType,
} from './types';

export default function createPokemonData(
  api: AxiosInstance,
): CreatePokemonListInterface {
  const defaultOffset = 0;
  async function getPokemonMoves(
    moves: [BaseType],
  ): Promise<MovesRequestReturnType[]> {
    const baseUri = `ability/`;
    const MovesWithDescription = moves.map(async move => {
      const response = await api
        .get(`${baseUri}/${getPokemonIdFromUrl(move.url)}`)
        .catch(err => {
          reactotron.log('err on getPokemonMoves', err);
          throw err;
        });
      if (response) {
        const EnglishIndex = response.data.effect_entries.findIndex(
          language => language.language.name === 'en',
        );
        const newMoveObject: MovesRequestReturnType = {
          name: response.data.name,
          description: response.data.effect_entries[EnglishIndex].short_effect,
        };
        return newMoveObject;
      }
      return null;
    });
    return Promise.all(MovesWithDescription);
  }
  async function getPokemonEvolutionChain(value: string) {
    const baseUri = `evolution-chain/${getPokemonEvolutionChainId(value)}`;
    const response = await api.get(baseUri).catch(err => {
      reactotron.log('err on getPokemonEvolutionChain', err);
      throw err;
    });
    if (response) {
      const evolutionFormatted = await response.data.chain.evolves_to.map(
        evolves => {
          const {name: baseFormName, url: baseFormUrl} =
            response.data.chain.species;

          const BaseForm = {
            name: capitalizeFirstLetter(baseFormName),
            url: response.data.chain.species.url,
            image: getPokemonImage(getPokemonIdFromUrl(baseFormUrl)),
          };

          let SecondEvolution;

          if (evolves.evolves_to.length !== 0) {
            evolves.evolves_to.map(secondEvolves => {
              const secondEvolutionPokemonId = getPokemonIdFromUrl(
                secondEvolves.species.url,
              );

              SecondEvolution = {
                name: capitalizeFirstLetter(secondEvolves.species.name),
                url: secondEvolves.species.url,
                min_level: secondEvolves.evolution_details[0].min_level,
                image: getPokemonImage(secondEvolutionPokemonId),
              };

              return SecondEvolution;
            });
          }

          const firstEvolutionPokemonId = getPokemonIdFromUrl(
            evolves.species.url,
          );

          const FirstEvolution = {
            name: capitalizeFirstLetter(evolves.species.name),
            url: evolves.species.url,
            min_level: evolves.evolution_details[0].min_level,
            image: getPokemonImage(firstEvolutionPokemonId),
          };

          return {
            BaseForm,
            FirstEvolution,
            SecondEvolution,
          };
        },
      );
      return evolutionFormatted;
    }
    return null;
  }

  async function getPokemonSpecies(value: string | number) {
    const baseUri = `pokemon-species/${value}`;
    const response = await api.get(baseUri).catch(err => {
      reactotron.log('err on getPokemonSpecies', err);
      throw err;
    });
    if (response) {
      const pokemonData = response.data;
      return pokemonData;
    }
    return null;
  }
  async function getPokemonSingle(name: string): PokemonSingleDataType {
    const baseUri = `pokemon/${name}`;
    const response = await api
      .get<PokemonSingleInterface>(baseUri)
      .catch(err => {
        reactotron.log('err on getPokemonList', err);
        throw err;
      });

    if (response) {
      const pokemonData = response.data;
      return pokemonData;
    }
    return null;
  }

  async function getPokemonList(offset?: number): PokemonListDataType {
    const baseUri = `pokemon/?limit=20&offset=${offset || defaultOffset}`;
    const response = await api.get<PokemonListInterface>(baseUri).catch(err => {
      reactotron.log('err on getPokemonList', err);
      throw err;
    });

    if (response) {
      const {results} = response.data;
      try {
        const pokemonsWithImage = Promise.all(
          results.map(async pokemon => {
            const pokemonId = getPokemonIdFromUrl(pokemon.url);
            const pokemonImage = getPokemonImage(pokemonId);
            const pokemonSingleData = await getPokemonSingle(pokemonId);
            pokemon.type = pokemonSingleData.types;
            pokemon.image = pokemonImage;
            pokemon.pokedexNumber = getPokedexNumber(pokemonId);
            return pokemon;
          }),
        );
        return await pokemonsWithImage;
      } catch (err) {
        reactotron.log(err);
      }
    }
    return null;
  }

  return {
    getPokemonList,
    getPokemonSingle,
    getPokemonSpecies,
    getPokemonEvolutionChain,
    getPokemonMoves,
  };
}

export * from './types';
