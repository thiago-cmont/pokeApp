import React, {useState} from 'react';

import {createContext} from 'use-context-selector';

import api from '../../config/api/api';
import {API_OFFSET} from '../../constants/apiOffset';
import {PokemonContextInterface} from './types';

export const PokemonContext = createContext({} as PokemonContextInterface);

const PokemonContextProvider: React.FC = ({children}) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonSingle, setPokemonSingle] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState(null);
  const [pokemonMoves, setPokemonMoves] = useState(null);
  const [page, setPage] = useState(1);

  async function getPokemonData() {
    const list = await api.methods.pokemonList.getPokemonList();
    if (list) {
      setPokemonData(list);
    }
    return list;
  }

  async function updatePokemonData() {
    const list = await api.methods.pokemonList.getPokemonList(
      page * API_OFFSET,
    );
    if (list) {
      setPokemonData(prevstate => [...prevstate, ...list]);
      setPage(page + 1);
    }
    return list;
  }

  async function getPokemonSingle(value) {
    const singlePokemon = await api.methods.pokemonList.getPokemonSingle(value);
    if (singlePokemon) {
      setPokemonSingle(singlePokemon);
    }

    return singlePokemon;
  }

  async function getPokemonSpecies(value) {
    const pokemonSpeciesData = await api.methods.pokemonList.getPokemonSpecies(
      value,
    );
    if (pokemonSpeciesData) {
      setPokemonSpecies(pokemonSpeciesData);
    }
    return pokemonSpeciesData;
  }

  async function getPokemonEvolutionChain(value) {
    const evolution = await api.methods.pokemonList.getPokemonEvolutionChain(
      value,
    );
    if (evolution) {
      setPokemonEvolutionChain(evolution);
    }
    return evolution;
  }

  async function getPokemonMoves(value) {
    const moves = await api.methods.pokemonList.getPokemonMoves(value);
    if (moves) {
      setPokemonMoves(moves);
    }
    return moves;
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemonData,
        setPokemonData,
        pokemonSingle,
        setPokemonSingle,
        pokemonSpecies,
        setPokemonSpecies,
        pokemonEvolutionChain,
        setPokemonEvolutionChain,
        pokemonMoves,
        setPokemonMoves,
        getPokemonData,
        getPokemonSingle,
        getPokemonSpecies,
        getPokemonEvolutionChain,
        getPokemonMoves,
        updatePokemonData,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonContextProvider;
