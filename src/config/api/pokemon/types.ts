export type BaseType = {
  name: string;
  url: string;
  image?: string;
  type?: TypesType;
  pokedexNumber?: string;
  id?: string;
};
export type ResultsType = [BaseType];
export interface PokemonListInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultsType;
}

export type AbilitiesType = [
  {
    ability: BaseType;
    is_hidden: boolean;
    slot: number;
  },
];

export type FormsType = [BaseType];

export type GameIndicesType = [
  {
    game_index: number;
    version: BaseType;
  },
];

export type MovesType = [
  {
    move: BaseType;
    version_group_details: [
      {
        level_learned_at: number;
        move_learn_method: BaseType;
        version_group: BaseType;
      },
    ];
  },
];

export type StatsType = [
  {
    base_stat: number;
    effort: number;
    stat: BaseType;
  },
];
export type TypesType = [
  {
    slot: number;
    type: BaseType;
  },
];
export interface PokemonSingleInterface {
  abilities: AbilitiesType;
  base_experience: number;
  forms: FormsType;
  game_indices: GameIndicesType;
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MovesType;
  name: string;
  order: number;
  past_types: [];
  species: BaseType;
  sprites: any;
  stats: StatsType;
  types: TypesType;
  weight: number;
}

export type FlavorTextEntriesType = [
  {
    flavor_text: string;
    language: BaseType;
    version?: BaseType;
    version_group?: BaseType;
  },
];

export type GeneraType = [
  {
    genus: string;
    language: BaseType;
  },
];

export type NamesType = [
  {
    language: BaseType;
    name: string;
  },
];

export type PalParkEncountersType = [
  {
    area: BaseType;
    base_score: number;
    rate: number;
  },
];

export type PokedexNumbers = [
  {
    entry_number: number;
    pokedex: BaseType;
  },
];

export type VarietiesType = [
  {
    is_default: boolean;
    pokemon: BaseType;
  },
];

export interface PokemonSpeciesInterface {
  base_happiness: number;
  capture_rate: number;
  color: BaseType;
  egg_groups: [BaseType];
  evolution_chain: {url: string};
  evolution_from_species: BaseType;
  flavor_text_entries: FlavorTextEntriesType;
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: GeneraType;
  generation: BaseType;
  growth_rate: BaseType;
  habitat: BaseType;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: NamesType;
  order: number;
  pal_park_encounters: PalParkEncountersType;
  pokedex_numbers: PokedexNumbers;
  shape: BaseType;
  varieties: VarietiesType;
}

export type EvolutionDetailsType = {
  gender: null;
  held_item: null | string;
  item: null | string;
  known_move: null | string;
  known_move_type: null | string;
  location: null | string;
  min_affection: null | string;
  min_beauty: null | string;
  min_happiness: null | string;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null | string;
  party_type: null | string;
  relative_physical_stats: null | string;
  time_of_day: string;
  trade_species: null | string;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
};

export type EvolvesToType = [
  {
    evolution_details: EvolutionDetailsType;
  },
];

export type ChainType = {
  evolution_details: [];
  evolves_to: EvolvesToType;
  is_baby: boolean;
  species: BaseType;
};

export interface PokemonEvolutionChainInterface {
  baby_trigger_item: boolean;
  chain: ChainType;
  id: number;
}

export type EffectEntriesType = [
  {
    effect: string;
    language: BaseType;
    short_effect: string;
  },
];

export type NamesMovesType = {
  language: BaseType;
  name: string;
};

export type MovesPokemonType = [
  {
    is_hidden: boolean;
    pokemon: BaseType;
    slot: number;
  },
];
export interface PokemonMovesInterface {
  effect_changes: [];
  effect_entries: EffectEntriesType;
  flavor_text_entries: FlavorTextEntriesType;
  generation: BaseType;
  id: number;
  is_main_series: boolean;
  name: string;
  names: NamesMovesType;
  pokemon: MovesPokemonType;
}

export type MovesRequestReturnType = {
  name: string;
  description: string;
};

export type PokemonListDataType = Promise<BaseType[]>;
export type PokemonSingleDataType = Promise<PokemonSingleInterface>;
export type PokemonSepeciesDataType = Promise<PokemonSpeciesInterface>;
export type PokemonEvolutionChainDataType =
  Promise<PokemonEvolutionChainInterface>;

export type PokemonsMovesDataType = Promise<PokemonMovesInterface>;

export interface CreatePokemonListInterface {
  getPokemonList(offset?: number): PokemonListDataType;
  getPokemonSingle(name: string): PokemonSingleDataType;
  getPokemonSpecies(value: string | number): PokemonSepeciesDataType;
  getPokemonEvolutionChain(
    value: string | number,
  ): PokemonEvolutionChainDataType;
  getPokemonMoves(moves: [BaseType]): Promise<MovesRequestReturnType[]>;
}
