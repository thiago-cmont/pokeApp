const getPokemonIdFromUrl = (url: string): string => url.split('/')[6];

export default getPokemonIdFromUrl;
