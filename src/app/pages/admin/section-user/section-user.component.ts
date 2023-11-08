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
  constructor(private clinicaFire: ClinicaService) {}

  ngOnInit(): void {
    this.clinicaFire.getProfesionales().subscribe((data)=> {
      this.profPendientes = data;
    })
  }
}
