import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@app/core/services/pokemon.service';
import { BehaviorSubject, take, tap } from 'rxjs';

//Models
import { DetailedPokemon, Specy, Pokemon } from '@models/detailed-pokemon.interface';
//Utils
import { calcDebilities } from '@shared/utils/pokemon-effectiveness';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {

  private pokemonSubject = new BehaviorSubject<any | null>(null);
  pokemon$ = this.pokemonSubject.asObservable();

  currentPokemonId!: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      paraMap => {
        this.currentPokemonId = paraMap.get('id');
      }
    )
    this.loadPokemon({id: this.currentPokemonId, lang: 9})
  }


  loadPokemon(props : any): void {
    this.pokemonService.getDetailedPokemon( props )
    .pipe(
      take(1),
      tap( ({ data }) => {
        const detailedPokemon: DetailedPokemon = {
          specy: undefined,
          pokemon: []
        }
        //specy model builder
        const specy: Specy = {
          id: undefined,
          name: undefined,
          jap_name: undefined,
          region: undefined,
          capture_rate: undefined,
          base_happiness: undefined,
          growthrate: undefined,
          shape: undefined,
          flavor: undefined,
          color: undefined,
          genera: undefined,
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
        specy.growthrate = data.specy[0].growthrate.name;
        specy.shape = data.specy[0].shape.name;
        for (const group of data.specy[0].egg_groups) {
          specy.egg_groups?.push(group.group.name)
        }
        specy.flavor = data.specy[0].flavor[0].text;
        specy.color = data.specy[0].color.name;
        specy.genera = data.specy[0].genera[0].genus;
        for (const stage of data.specy[0].evolutions.stage) {
          specy.evolutions?.push({name: stage.name, id: stage.id})
        }
        //pokemon models builder
        const pokemonArr: Pokemon[] = [];
        for (const pkmn of data.pokemon) {
          const pokemon: Pokemon = {
            id: undefined,
            name: undefined,
            height: undefined,
            weight: undefined,
            order: undefined,
            base_experience: undefined,
            types: [],
            debilities: [],
            abilities: [],
            stats: [],
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
          pokemon.debilities = calcDebilities(pokemon.types)
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
        detailedPokemon.specy = specy;
        detailedPokemon.pokemon = pokemonArr;

        console.log(detailedPokemon)
        this.pokemonSubject.next(detailedPokemon)
        this.switchBgByType(data.pokemon[0].types[0].type.name)
      })
    ).subscribe();
  }


  switchBgByType(type: string): void {
    document.body.className = '';
    document.body.classList.add('bodybg-' + type);
  }

}
