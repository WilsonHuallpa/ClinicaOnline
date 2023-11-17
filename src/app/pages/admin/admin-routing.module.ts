import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionUserComponent } from './section-user/section-user.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from 'src/app/components/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from 'src/app/components/solicitar-turno/solicitar-turno.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'mi-perfil', component: MiPerfilComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
      { path: 'solicitar-turno', component: SolicitarTurnoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
