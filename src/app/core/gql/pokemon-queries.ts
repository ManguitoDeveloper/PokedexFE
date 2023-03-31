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
    stats: pokemon_v2_pokemonstats(where: {pokemon_id: {_eq: $id}}) {
      value: base_stat
      stat: pokemon_v2_stat {
        name
      }
    }
  }
}

`;
