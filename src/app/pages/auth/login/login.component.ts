import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FireErrorService } from 'src/app/services/fire-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authUser: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fireError: FireErrorService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.loading = true;
    this.authUser
      .loginUser(email, password)
      .then(() => {
        this.router.navigate(['/welcome']);
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.fireError.codeError(error.code), 'Error');
      });
  }
  quickAccess(email: string, password: string) {
    this.loginUsuario.setValue({
      email: email,
      password: password,
    });
  }
}
