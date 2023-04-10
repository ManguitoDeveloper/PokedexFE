import { gql } from "apollo-angular";

export const GET_POKEMON_LIST = gql`
query pokemonList($limit: Int!, $offset: Int!, $max: Int!) {
  species: pokemon_v2_pokemonspecies(
    order_by: { id: asc }
    limit: $limit
    offset: $offset
    where: { id: {_lt: $max} }
  ) {
    id
    name
  }
}
`;

export const GET_DETAILED_POKEMON = gql`
  query GetDetailedPokemon($id: Int, $lang: Int) {
    specy: pokemon_v2_pokemonspecies(where: { id: { _eq: $id } }) {
      id
      name
      jap_name: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 1}}) {
        name
      }
      gen: generation_id
      capture_rate
      base_happiness
      growthrate: pokemon_v2_growthrate {
        name
      }
      shape: pokemon_v2_pokemonshape {
        name
      }
      egg_groups: pokemon_v2_pokemonegggroups {
        group: pokemon_v2_egggroup {
          name
        }
      }
      flavor: pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: $lang } }
        order_by: { version_id: desc }
        limit: 1
      ) {
        text: flavor_text
      }
      color: pokemon_v2_pokemoncolor {
        name
      }
      genera: pokemon_v2_pokemonspeciesnames(
        where: { language_id: { _eq: $lang } }
      ) {
        genus
      }
      evolutions: pokemon_v2_evolutionchain {
        stage: pokemon_v2_pokemonspecies {
          name
          id
        }
      }
    }
    pokemon: pokemon_v2_pokemon(where: { pokemon_species_id: { _eq: $id } }) {
      id
      name
      height
      weight
      order
      base_experience
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        is_hidden
        ability: pokemon_v2_ability {
          name
          flavor: pokemon_v2_abilityflavortexts(
            where: { language_id: { _eq: $lang } }
            order_by: { id: desc }
            limit: 1
          ) {
            text: flavor_text
          }
        }
      }
      stats: pokemon_v2_pokemonstats {
        value: base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      items: pokemon_v2_pokemonitems(distinct_on: item_id) {
        rarity
        item: pokemon_v2_item {
          name
          flavor: pokemon_v2_itemflavortexts(
            where: { language_id: { _eq: $lang } }
            order_by: { id: desc }
            limit: 1
          ) {
            text: flavor_text
          }
        }
      }
      moves: pokemon_v2_pokemonmoves(distinct_on: move_id) {
        level
        move: pokemon_v2_move {
          name
          accuracy
          pp
          priority
          power
          class: pokemon_v2_movedamageclass {
            name
          }
          machine: pokemon_v2_machines(
            limit: 1
            order_by: { version_group_id: desc }
          ) {
            number: machine_number
          }
          flavor: pokemon_v2_moveflavortexts(
            where: { language_id: { _eq: $lang } }
            limit: 1
            order_by: { version_group_id: desc }
          ) {
            text: flavor_text
          }
          type: pokemon_v2_type {
            name
          }
        }
        learn_method: pokemon_v2_movelearnmethod {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON = gql`
query getPokemonById($id: Int, $lang: Int) {
  res: pokemon_v2_pokemon(where: {pokemon_species_id: {_eq: $id}}) {
    id: pokemon_species_id
    name
    height
    weight
    types: pokemon_v2_pokemontypes {
      type: pokemon_v2_type {
        name
      }
    }
    specie: pokemon_v2_pokemonspecy {
      jap_name: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 1}}) {
        name
      }
      flavor: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: $lang}, pokemon_species_id: {_eq: $id}}, order_by: {version_id: desc}, limit: 1) {
        text: flavor_text
      }
      gen: generation_id
      color: pokemon_v2_pokemoncolor {
        name
      }
      genera: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: $lang}}) {
        genus
      }
    }
    stats: pokemon_v2_pokemonstats {
      value: base_stat
      stat: pokemon_v2_stat {
        name
      }
    }
  }
}
`;
