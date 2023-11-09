import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { WelcomenComponent } from './welcomen/welcomen.component';
import { RegisterComponent } from './register/register.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';


@NgModule({
  declarations: [
    LoginComponent,
    WelcomenComponent,
    RegisterComponent,
    VerificarCorreoComponent,
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
