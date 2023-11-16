import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isClienteActive: boolean = false;
  isProfesionalActive: boolean = false;
  dataArray: { img: string; mail: string; contrasena: string }[] = [
    {
      img: '../../../assets/avatar-de-hombre.png',
      mail: 'wilson@gmail.com',
      contrasena: '123546',
    },
    {
      img: '../../../assets/avatar.png',
      mail: 'pepe@gmail.com',
      contrasena: '123546',
    },]
  constructor(private router: Router){
    
  }
  mostrarClienteComponent() {
    this.isClienteActive = true;
    this.isProfesionalActive = false;
  }
  mostrarProfesionalComponent() {
    this.isClienteActive = false;
    this.isProfesionalActive = true;
  }
  selecte(){
    console.log('entre')
  }
  goBack(){
    this.router.navigate(['/auth']);
  }
}
