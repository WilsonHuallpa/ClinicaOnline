import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/interfaces/Profesional';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-section-user',
  templateUrl: './section-user.component.html',
  styleUrls: ['./section-user.component.scss'],
})
export class SectionUserComponent implements OnInit {
  profPendientes:Profesional[] = [];
  isClienteActive: boolean = true;
  isProfesionalActive: boolean = false;
  isAdmin: boolean = false; 
  constructor(private clinicaFire: ClinicaService) {}

  ngOnInit(): void {
    this.clinicaFire.getProfesionales().subscribe((data)=> {
      this.profPendientes = data;
    })
  }
  async onAceptarRechazar(id:string, value: string){
    await this.clinicaFire.updateProfesional(id, value);
  }
  
  mostrarClienteComponent() {
    this.isClienteActive = true;
    this.isProfesionalActive = false;
    this.isAdmin = false;
  }
  mostrarProfesionalComponent() {
    this.isClienteActive = false;
    this.isProfesionalActive = true;
    this.isAdmin = false;
  }
  mostrarAdminComponent() {
    this.isAdmin = true;
    this.isClienteActive = false;
    this.isProfesionalActive = false;
  }
}
