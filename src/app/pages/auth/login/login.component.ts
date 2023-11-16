import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FireErrorService } from 'src/app/services/fire-error.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('enterState',[
      state('void',style({
        transform: 'translateX(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(500,style({
          transform:'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authUser: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService,
    private clinicaFire: ClinicaService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    console.log(email)
    console.log(password)
    this.loading = true;
    this.authUser
      .loginUser(email, password)
      .then(async (data) => {
        console.log(data.user.uid);
        const docSnap = await this.clinicaFire.getUserByID(data.user.uid);
        const user = docSnap.data();
        if (!user) {
          return;
        }
        const rol = user['rol'];
        if (rol == 'profesional') this.vericargarStatus(user['estado']);
        this.redirectoPage(rol);
        this.loading = false;
      })
      .catch((error: any) => {
        this.loading = false;
        if (error.message) {
          this.toastr.error(error.message, 'Error');
        } else {
          this.toastr.error(this.fireError.codeError(error.code), 'Error');
        }
      });
  }
  quickAccess(email: string, password: string) {

    this.loginUsuario.setValue({
      email,
      password
    });
  }
  redirectoPage(profile: string) {
    switch (profile) {
      case 'Administrador':
        this.router.navigate(['/admin']);
        break;
      case 'Paciente':
        this.router.navigate(['/paciente']);
        break;
      case 'Profesional':
        this.router.navigate(['/profesional']);
        break;
    }
  }
  vericargarStatus(status: string) {
    if (status == 'Pendiente')
      throw new Error('El usuario esta Pendiente. Se requiere Aprobación.');
    if (status == 'Rechazado')
      throw new Error('El usuario fue rechazado. Lo siento!');
  }
  goBack(){
    this.router.navigate(['/auth']);
  }
}
