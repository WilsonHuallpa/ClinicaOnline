import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesionalRoutingModule } from './profesional-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ProfesionalRoutingModule
  ]
})
export class ProfesionalModule { }
