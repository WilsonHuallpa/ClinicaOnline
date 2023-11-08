import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionUserComponent } from './section-user/section-user.component';

const routes: Routes = [
  {
    path: '',
    component: SectionUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
