export interface DetailedPokemon {
  specy?: Specy
  pokemon?: Pokemon[]
}

export interface Specy {
  id?: number
  name?: string
  jap_name?: string
  region?: string
  capture_rate?: number
  base_happiness?: number
  growthrate?: string
  shape?: string
  egg_groups?: string[]
  flavor?: string
  color?: string
  genera?: string[]
  evolutions?: Stage[]
}

export interface Pokemon {
  id?: number
  name?: string
  height?: number
  weight?: number
  order?: number
  base_experience?: number
  types: string[]
  debilities?: Debility[]
  abilities?: Ability[]
  stats?: Stat[]
  items?: Item[]
  moves?: Move[]
}

interface Stage {
  name: string
  id: number
}

interface Debility {
  type: string,
  value: number
}

interface Ability {
  is_hidden: boolean
  name: string
  flavor: string
}

interface Stat {
  name: string
  value: number
}

interface Item {
  name: string
  flavor: string
  rarity: number
}

interface Move {
  name: string
  accuracy: number
  pp: number
  priority: number
  power: number
  class: string
  machine: number
  flavor: string
  type: string
  level: number
  learn_method: string
}


