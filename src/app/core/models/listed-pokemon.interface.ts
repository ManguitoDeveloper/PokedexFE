interface Pokemon {
  id: number;
  name: string;
}

export interface ListedPokemon {
  species: Pokemon[];
}

export interface pokemonStat {
  name: string;
  value: number;
}

export interface previewPokemon {
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
  stats: pokemonStat[];
}
