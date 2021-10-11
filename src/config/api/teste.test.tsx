import api from './api';

describe('Fetch Pokemon data request test', () => {
  test('send url to request method', async () => {
    const [data] = await api.methods.pokemonList.getPokemonList();
    expect(data).toHaveProperty(['name']);
    expect(data).toHaveProperty(['image']);
    expect(data).toHaveProperty(['url']);
    expect(data).toHaveProperty(['pokedexNumber']);
    expect(data).toHaveProperty(['type']);
  });
});
