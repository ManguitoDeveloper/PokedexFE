import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ListedPokemon } from '@app/core/models/listed-pokemon.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  @Input() items$!: Observable<ListedPokemon['species'] | null>;
  @Input() selected?: number;
  @Input() no_back!: boolean;
  @Input() no_more!: boolean;

  @Output() goPrev = new EventEmitter<void>();
  @Output() goNext = new EventEmitter<void>();
  @Output() selectPokemon = new EventEmitter<number>();

  prevPokemon(): void {
    this.goPrev.emit();
  }

  nextPokemon(): void {
    this.goNext.emit();
  }

  onSelected(id: number): void {
    this.selectPokemon.emit(id);
  }

}
