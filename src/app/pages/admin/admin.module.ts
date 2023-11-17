import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SectionUserComponent } from './section-user/section-user.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    SectionUserComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule
  ]
})
export class AdminModule { }
