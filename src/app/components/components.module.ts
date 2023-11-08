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

@NgModule({
  declarations: [
    LayoutComponent,
    SpinnerComponent,
    TablaEspecialidadComponent,
    MenuClinicaComponent,
    ListProfPendientesComponent,
    ModalUsuarioComponent
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
    ListProfPendientesComponent
  ]
})

export class ComponentsModule { }
