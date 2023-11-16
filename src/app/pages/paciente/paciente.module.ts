import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { MenuPacienteComponent } from './menu-paciente/menu-paciente.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    PacienteComponent,
    MenuPacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    ComponentsModule
  ]
})
export class PacienteModule { }
