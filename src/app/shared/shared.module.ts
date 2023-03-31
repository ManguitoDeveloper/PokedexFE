import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


import { NgChartsModule } from 'ng2-charts';
import { EnvPipe } from './pipes/env.pipe';
import { StatChartComponent } from './components/stat-chart/stat-chart.component';

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule
  ],
  declarations: [
    SearchBarComponent,
    EnvPipe,
    StatChartComponent
  ],
  exports: [
    SearchBarComponent,
    EnvPipe,
    StatChartComponent
  ]
})
export class SharedModule { }
