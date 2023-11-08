import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AltaPacientesComponent } from './alta-pacientes/alta-pacientes.component';
import { AltaProfesionalesComponent } from './alta-profesionales/alta-profesionales.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    LoginComponent,
    AltaPacientesComponent,
    AltaProfesionalesComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule
  ]
})
export class AuthModule { }
