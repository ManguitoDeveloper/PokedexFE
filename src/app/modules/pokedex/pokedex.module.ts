import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexComponent } from './pokedex.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

import { NgIconsModule } from '@ng-icons/core';
import { cssPlayTrackPrev, cssPlayTrackNext, cssArrowRight, cssArrowUp, cssArrowDown, cssGenderMale, cssGenderFemale } from '@ng-icons/css.gg';

@NgModule({
  declarations: [
    PokedexComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PokedexRoutingModule,
    NgIconsModule.withIcons({ cssPlayTrackPrev, cssPlayTrackNext, cssArrowRight, cssArrowUp, cssArrowDown, cssGenderMale, cssGenderFemale }),
  ]
})
export class PokedexModule { }
