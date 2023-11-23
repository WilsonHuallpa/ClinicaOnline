import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionUserComponent } from './section-user/section-user.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from 'src/app/components/mis-turnos/mis-turnos.component';
import { AdminComponent } from './admin.component';
import { TurnosSolicitarComponent } from 'src/app/components/turnos-solicitar/turnos-solicitar.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: SectionUserComponent },
      { path: 'inicio', component: SectionUserComponent },
      { path: 'mi-perfil', component: MiPerfilComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
      { path: 'solicitar-turno', component: TurnosSolicitarComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
