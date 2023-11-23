import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesionalRoutingModule } from './profesional-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfesionalComponent } from './profesional.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    HomeComponent,
    ProfesionalComponent
  ],
  imports: [
    CommonModule,
    ProfesionalRoutingModule,
    ComponentsModule
  ]
})
export class ProfesionalModule { }
