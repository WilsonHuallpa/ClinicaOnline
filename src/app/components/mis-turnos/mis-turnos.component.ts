import { Component } from '@angular/core';
import { Turno } from 'src/app/interfaces/Turno';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';
export type Estado = 'cancelar' | 'resena' | 'calificar' | 'encuesta';
@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent {
  turnosOriginal: any[] = [];
  turnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;
  estado: Estado = 'cancelar';
  filtro: string = '';
  miRol: string = '';
  miUID: string = '';
  idTipo: string = '';

  constructor(
    private turnoService: TurnoService,
    private reservaService: ReservaService,
    private otroService: OtroService,
    private usuarioService: ClinicaService) { }

    ngOnInit(): void {
      this.otroService.getDocumentSnapshotDeUsuario().subscribe(
        ds => {
          this.miRol = ds.data().rol;
          if (this.miRol === 'Administrador') {
            this.turnoService.getTurnos().subscribe(data => this.turnos = data);
          }
          else {
            this.miUID = ds.id;
            if (this.miRol === 'Paciente') {
              this.idTipo = 'idPac';
            }
            else if (this.miRol === 'Profesional') {
              this.idTipo = 'idEsp';
            }
            this.obtenerTurnos(this.idTipo, this.miUID)
          }
        }
      );
    }

    pacienteFiltrar() {
      if (this.filtro) {
        this.turnos = this.turnos.filter(turno =>
          turno.especialidad.toLowerCase().includes(this.filtro.toLowerCase()) ||
          turno.especialista.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
          turno.especialista.apellido.toLowerCase().includes(this.filtro.toLowerCase())
        );
      } else {
        this.obtenerTurnos(this.idTipo, this.miUID)
      }
    }
    obtenerTurnos(idTipo: string, miUID: string){
      this.turnoService.getTurnoPorid(idTipo, miUID).subscribe(data => this.turnos = data)
    }
    especialistaFiltrar() {
      if (this.filtro === '') {
        this.turnos = this.turnosOriginal.slice();
      } else {
        const filtrados: any[] = [];
        this.turnosOriginal.forEach(turno => {
          if (
            turno.especialidad.includes(this.filtro) ||
            (turno.especialista &&
              (turno.especialista.nombre.includes(this.filtro) ||
                turno.especialista.apellido.includes(this.filtro)))
          ) {
            filtrados.push(turno);
          }
        });
        this.turnos = filtrados.slice();
      }
    }

    cancelarTurnoHandler(turno: Turno | null) {
      this.estado = 'cancelar';
      this.turnoSeleccionado = turno;
    }

    verReviewHandler(turno: Turno | null) {
      this.estado = 'resena'
      this.turnoSeleccionado = turno;
    }
  
    calificarAtencionHandler(turno: any) {
      this.estado = 'calificar';
      this.turnoSeleccionado = turno;
    }

    completarEncuestaHandler(turno: Turno | null) {
      this.estado = 'encuesta';
      this.turnoSeleccionado = turno;
    }
    rechazarTurnoHandler(turno: Turno | null) {
     
    }
    aceptarTurnoHandler(turno:  Turno | null) {
     
    }

    finalizarTurnoHandler(turno:  Turno | null) {
      this.turnoSeleccionado = turno;
    }

}
