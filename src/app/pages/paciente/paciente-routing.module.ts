import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { MiPerfilComponent } from 'src/app/components/mi-perfil/mi-perfil.component';
import { SolicitarTurnoComponent } from 'src/app/components/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from 'src/app/components/mis-turnos/mis-turnos.component';


const routes: Routes = [
  {
    path: '',
    component: PacienteComponent, children: [
      { path: '', component: MiPerfilComponent },
      { path: 'mi-perfil', component: MiPerfilComponent },
      { path: 'mis-turnos', component: MisTurnosComponent },
      { path: 'solicitar-turno', component: SolicitarTurnoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }