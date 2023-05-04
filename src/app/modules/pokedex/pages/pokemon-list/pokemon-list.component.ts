import { Component, OnInit} from '@angular/core';
import { PokemonService } from '@services/pokemon.service';
//models
import { paginator, previewInfo } from '@models/paginator-variables.interface';
import { ListedPokemon, PreviewPokemon } from '@models/listed-pokemon.interface';
import { BehaviorSubject, take, tap } from 'rxjs';
//environment
import { environment } from '@environments/environment';
//utils
import { switchBgByType } from '@shared/utils/pokedex-bg';
import { pkmnStatsToArray } from '@shared/utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  private pokemonListSubject = new BehaviorSubject<ListedPokemon['species'] | null>(null);
  pokemonList$ = this.pokemonListSubject.asObservable();

  private previewPokemonSubject = new BehaviorSubject<PreviewPokemon | null>(null);
  previewPokemon$ = this.previewPokemonSubject.asObservable();

  page_info: paginator = {
    limit: 10,
    offset: 0,
    max: environment['fetch_pkmn']
  };
  currentPkmnInfo: previewInfo = {
    id: 1,
    lang: 9
  }

  pkmn_stats!: number[];
  totalStats!: number;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {

    this.listPokemon(this.page_info)
    this.loadPokemon(this.currentPkmnInfo)

  }

  listPokemon(props : paginator): void {
    this.pokemonService.getPokemonListResults( props )
    .pipe(
      take(1),
      tap( ({ data }) => {
        const { species } = data;
        this.pokemonListSubject.next(species)
      })
    ).subscribe();
  }

  loadPokemon(props : previewInfo): void {
    this.pokemonService.getPokemon( props )
    .pipe(
      take(1),
      tap( ({ data }) => {
        const { res } = data;
        const pokemon: PreviewPokemon = {
          id: undefined,
          name: undefined,
          genera: undefined,
          height: undefined,
          weight: undefined,
          jap_name: undefined,
          color: undefined,
          region: undefined,
          flavor: undefined,
          types: [],
          stats: []
        };
        pokemon.id = res[0].id;
        pokemon.name = res[0].name;
        pokemon.genera = res[0].specie.genera[0].genus;
        pokemon.height = res[0].height / 10;
        pokemon.weight = res[0].weight / 10;
        pokemon.jap_name = res[0].specie.jap_name[0].name;
        pokemon.color = res[0].specie.color.name;
        pokemon.flavor = res[0].specie.flavor[0].text;
        pokemon.types?.push
        for (const type of res[0].types) {
          pokemon.types?.push(type.type.name)
        }
        for (const stat of res[0].stats) {
          pokemon.stats?.push({name: stat.stat.name, value: stat.value})
        }
        switch(res[0].specie.gen) {
          case 1: pokemon.region = "Kanto"
            break;
          case 2: pokemon.region = "Jotoh"
            break;
          case 3: pokemon.region = "Hoenn"
            break;
          case 4: pokemon.region = "Sinnoh"
            break;
          case 5: pokemon.region = "Unova"
            break;
          case 6: pokemon.region = "Kalos"
            break;
          case 7: pokemon.region = "Alola"
            break;
          case 8: pokemon.region = "Galar"
            break;
          case 8: pokemon.region = "Paldea"
            break;
        }
        this.previewPokemonSubject.next(pokemon)
        switchBgByType(pokemon.types[0]);
        [this.pkmn_stats, this.totalStats] = pkmnStatsToArray(pokemon.stats);
      })
    ).subscribe();
  }

  nextPokemon(): void {
    this.page_info.offset += 1;
    this.currentPkmnInfo.id += 1;
    this.listPokemon(this.page_info)
    this.loadPokemon(this.currentPkmnInfo)
  }

  prevPokemon(): void {
    this.page_info.offset -= 1;
    this.currentPkmnInfo.id -= 1;
    this.listPokemon(this.page_info)
    this.loadPokemon(this.currentPkmnInfo)
  }

  onPokemonSelected(id: number): void {
    this.currentPkmnInfo.id = id;
    if (this.currentPkmnInfo.id <= this.page_info.max - 10) {
      this.page_info.offset = id - 1;
    }
    this.listPokemon(this.page_info)
    this.loadPokemon(this.currentPkmnInfo)
  }

}
