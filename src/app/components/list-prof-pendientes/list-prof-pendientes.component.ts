import { Component, Input } from '@angular/core';
import { Profesional } from 'src/app/interfaces/Profesional';

@Component({
  selector: 'app-list-prof-pendientes',
  templateUrl: './list-prof-pendientes.component.html',
  styleUrls: ['./list-prof-pendientes.component.scss']
})
export class ListProfPendientesComponent {
  selectedItem: Profesional | null = null;

  @Input() profPendientes: Profesional[] = [];

  setSelectedItem(item: Profesional | null) {
    this.selectedItem = item;
  }

}
