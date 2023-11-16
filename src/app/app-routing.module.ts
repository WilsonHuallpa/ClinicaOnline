import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
      data: {animation: 'Admin'}
  },
  {
    path: 'profesional',
    loadChildren: () =>
      import('./pages/profesional/profesional.module').then(
        (m) => m.ProfesionalModule
      ),
  },
  {
    path: 'paciente',
    // canActivate: [VerifiedGuard, PacienteGuard],
    loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
