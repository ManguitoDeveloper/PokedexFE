import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@app/core/services/pokemon.service';
import { BehaviorSubject, take, tap } from 'rxjs';
//Models
import { DetailedPokemon, Specy, Pokemon, Ability, Stage } from '@models/detailed-pokemon.interface';
//Utils
import { calcDebilities } from '@shared/utils/pokemon-effectiveness';
import { switchBgByType } from '@shared/utils/pokedex-bg';
import { pkmnStatsToArray, formatEvolutionChain } from '@shared/utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, AfterViewInit {

  private pokemonSubject = new BehaviorSubject<DetailedPokemon | null>(null);
  pokemon$ = this.pokemonSubject.asObservable();
  currentSpeciesId!: string | null;
  currentPokemonIndex = 0;
  pokemon: DetailedPokemon = {
    specy: undefined,
    pokemon: undefined
  };
  pkmn_stats!: number[];
  totalStats!: number;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      paraMap => {
        this.currentSpeciesId = paraMap.get('id');
        this.loadPokemon({id: this.currentSpeciesId, lang: 9})
      }
    )
  }

  ngAfterViewInit(): void {
    this.loadPokemon({id: this.currentSpeciesId, lang: 9})
  }


  loadPokemon(props : any): void {
    this.pokemonService.getDetailedPokemon( props )
    .pipe(
      take(1),
      tap( ({ data }) => {
        //specy model builder
        const specy: Specy = {
          id: 0,
          name: "",
          jap_name: "",
          region: "",
          capture_rate: 0,
          base_happiness: 0,
          hatch_steps: 0,
          growthrate: "",
          gender_rate: 0,
          shape: "",
          flavor: "",
          color: "",
          genera: "",
          egg_groups: [],
          evolutions: []
        }
        specy.id = data.specy[0].id;
        specy.name = data.specy[0].name;
        specy.jap_name = data.specy[0].jap_name[0].name;
        switch(data.specy[0].gen) {
          case 1: specy.region = "Kanto"
            break;
          case 2: specy.region = "Jotoh"
            break;
          case 3: specy.region = "Hoenn"
            break;
          case 4: specy.region = "Sinnoh"
            break;
          case 5: specy.region = "Unova"
            break;
          case 6: specy.region = "Kalos"
            break;
          case 7: specy.region = "Alola"
            break;
          case 8: specy.region = "Galar"
            break;
          case 8: specy.region = "Paldea"
            break;
        }
        specy.capture_rate = data.specy[0].capture_rate;
        specy.base_happiness = data.specy[0].base_happiness;
        specy.hatch_steps = (data.specy[0].hatch_counter ) * 257;
        specy.growthrate = data.specy[0].growthrate.name;
        specy.gender_rate = data.specy[0].gender_rate;
        specy.shape = data.specy[0].shape.name;
        for (const group of data.specy[0].egg_groups) {
          specy.egg_groups?.push(group.group.name)
        }
        specy.flavor = data.specy[0].flavor[0].text;
        specy.color = data.specy[0].color.name;
        specy.genera = data.specy[0].genera[0].genus;
        const evolutions: Stage[] = [];
        for (const stage of data.specy[0].evolutions.stage) {
          evolutions?.push({name: stage.name, id: stage.id, evolves_from: stage.evolves_from_species_id})
        }
        specy.evolutions = formatEvolutionChain(evolutions, 'evolves_from');
        //pokemon models builder
        const pokemonArr: Pokemon[] = [];
        for (const pkmn of data.pokemon) {
          const pokemon: Pokemon = {
            id: 0,
            name: "",
            height: 0,
            weight: 0,
            order: 0,
            base_experience: 0,
            types: [],
            weaknesses: [],
            abilities: [],
            stats: [],
            effort: [],
            items: [],
            moves: []
          };
          pokemon.id = pkmn.id;
          pokemon.name = pkmn.name;
          pokemon.height = pkmn.height / 10;
          pokemon.weight = pkmn.weight / 10;
          pokemon.order = pkmn.order;
          pokemon.base_experience = pkmn.base_experience;
          for (const type of pkmn.types) {
            pokemon.types?.push(type.type.name)
          }
          pokemon.weaknesses = calcDebilities(pokemon.types)
          for (const ability of pkmn.abilities) {
            pokemon.abilities?.push({
              is_hidden: ability.is_hidden,
              name: ability.ability.name,
              flavor: ability.ability.flavor[0].text,
            });
          }
          for (const stat of pkmn.stats) {
            pokemon.stats?.push({ name: stat.stat.name, value: stat.value });
          }
          for (const stat of pkmn.stats) {
            if (stat.effort) {
              pokemon.effort?.push({ name: stat.stat.name, value: stat.effort });
            }
          }
          for (const item of pkmn.items) {
            pokemon.items?.push({
              name: item.item.name,
              flavor: item.item.flavor[0].text,
              rarity: item.rarity
            });
          }
          for (const move of pkmn.moves) {
            pokemon.moves?.push({
              name: move.move.name,
              flavor: move.move.flavor[0]?.text,
              accuracy: move.move.accuracy,
              pp: move.move.pp,
              priority: move.move.priority,
              power: move.move.power,
              class: move.move.class.name,
              machine: move.move.machine[0]?.number,
              type: move.move.type.name,
              level: move.level,
              learn_method: move.learn_method.name
            });
          }
          pokemonArr.push(pokemon);
        }
        const detailedPokemon: DetailedPokemon = {
          specy: specy,
          pokemon: pokemonArr
        }
        this.pokemonSubject.next(detailedPokemon)
        this.pokemon =  detailedPokemon;
        switchBgByType(data.pokemon[0].types[0].type.name);
        [this.pkmn_stats, this.totalStats] = pkmnStatsToArray(pokemonArr[0].stats);
        console.log(this.pokemon)
      })
    ).subscribe();
  }

  getNotHiddenAbilities(abilities: Ability[]) {
    return abilities.filter((ability: Ability) => !ability.is_hidden);
  }

  getHiddenAbility(abilities: Ability[]) {
    return abilities.find((ability: Ability) => ability.is_hidden);
  }

  nextStageStep(str: string, isLast: boolean): string {
    return isLast ? '0px' : "-" + (this.getSizeFromString(str) + 250) + 'px';
  }

  prevStageStep(str: string, isFirst: boolean, size: number): string {
    return isFirst ? "-" + (size * 250) + "px" : "-" + (this.getSizeFromString(str) - 250) + 'px';
  }

  getSizeFromString(str: string): number {
    return parseInt(str.replace(/[^0-9]/g, ""));
  }


}
