import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
//Custom Types
import { paginator } from '@models/paginator-variables.interface';
import { ListedPokemon } from '@models/listed-pokemon.interface';
//Queries
import { GET_POKEMON_LIST, GET_POKEMON } from '../gql/pokemon-queries';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private apollo: Apollo) {
  }

  getPokemonListResults( params: paginator ): any {
    return this.apollo.watchQuery<ListedPokemon>({
      query: GET_POKEMON_LIST,
      variables: params,
    }).valueChanges
  }

  getPokemon( params: any): any {
    return this.apollo.watchQuery<ListedPokemon>({
      query: GET_POKEMON,
      variables: params,
    }).valueChanges
  }
}
