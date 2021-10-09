const getPokedexNumber = (id: string | number): string =>
  id.toString().padStart(3, '0');

export default getPokedexNumber;
