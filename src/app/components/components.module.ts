import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { TablaEspecialidadComponent } from './tabla-especialidad/tabla-especialidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuClinicaComponent } from './menu-clinica/menu-clinica.component';
import { ListProfPendientesComponent } from './list-prof-pendientes/list-prof-pendientes.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { AltaPacientesComponent } from './Altas/alta-pacientes/alta-pacientes.component';
import { AltaProfesionalesComponent } from './Altas/alta-profesionales/alta-profesionales.component';
import { AltaAdminComponent } from './Altas/alta-admin/alta-admin.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SpinnerComponent,
    TablaEspecialidadComponent,
    MenuClinicaComponent,
    ListProfPendientesComponent,
    ModalUsuarioComponent,
    AltaPacientesComponent,
    AltaProfesionalesComponent,
    AltaAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LayoutComponent,
    SpinnerComponent,
    TablaEspecialidadComponent,
    ListProfPendientesComponent,
    AltaPacientesComponent,
    AltaProfesionalesComponent,
    AltaAdminComponent
  ]
})

export class ComponentsModule { }
