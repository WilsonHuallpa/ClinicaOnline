import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isClienteActive: boolean = true;
  isProfesionalActive: boolean = false;

  mostrarClienteComponent() {
    this.isClienteActive = true;
    this.isProfesionalActive = false;
  }
  mostrarProfesionalComponent() {
    this.isClienteActive = false;
    this.isProfesionalActive = true;
  }
}
