import { Component } from '@angular/core';
import { Item } from 'src/app/components/layout/layout.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  items: Item[] = [];
  constructor() {
    this.items = [
      {
        title: 'Inicio',
        link: 'inicio',
        active: false,
      },
      {
        title: 'Mi Perfil',
        link: 'mi-perfil',
        active: false,
      },
      {
        title: 'Turnos',
        link: 'mis-turnos',
        active: false,
      },
      {
        title: 'Solicitar Turnos',
        link: 'solicitar-turno',
        active: false,
      },
      {
        title: 'Seccion Paciente',
        link: 'seccion-paciente',
        active: false,
      },
    ];
  }
}
