import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AltaPacientesComponent } from './alta-pacientes/alta-pacientes.component';
import { AltaProfesionalesComponent } from './alta-profesionales/alta-profesionales.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'altaPaciente',
    component: AltaPacientesComponent,
  },  
  {
    path: 'altaProfesional',
    component: AltaProfesionalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
