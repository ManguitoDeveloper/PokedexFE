interface Pokemon {
  id: number;
  name: string;
}

export interface ListedPokemon {
  species: Pokemon[];
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PreviewPokemon {
  id?: number;
  name?: string;
  genera?: string;
  height?: number;
  weight?: number;
  jap_name?: string;
  color?: string;
  region?: string;
  flavor?: string;
  types: string[];
  stats: PokemonStat[];
}
