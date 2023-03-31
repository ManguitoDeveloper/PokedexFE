import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GraphQLModule } from '@app/graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    GraphQLModule,
    HttpClientModule
  ],
  exports: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent
  ]
})
export class CoreModule { }
