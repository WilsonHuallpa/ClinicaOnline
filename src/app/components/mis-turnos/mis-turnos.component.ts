import { Component } from '@angular/core';
import { Turno } from 'src/app/interfaces/Turno';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';
export type Estado = 'cancelar' | 'resena';
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

  modoNormal: boolean = true;
  modoCancelar: boolean = false;
  modoReview: boolean = false;
  modoCompletarEncuesta: boolean = false;
  modoCalificarAtencion: boolean = false;
  modoRechazar: boolean = false;
  modoFinalizar: boolean = false;

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

    // filtrar() {
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

    volverHandler() {
      this.modoNormal = true;
      this.modoCancelar= false;
      this.modoReview= false;
      this.modoCompletarEncuesta= false;
      this.modoCalificarAtencion= false;
      this.modoRechazar= false;
      this.modoFinalizar= false;
    }

    cancelarTurnoHandler(turno: Turno | null) {
      this.estado = 'cancelar';
      this.turnoSeleccionado = turno;
    }
    cancelarConfirmarHandler(razon: string) {
      const nuevoTurno = {
        estado: 'cancelado',
        razon: razon
      };

      // this.turnoService.actualizar(this.turnoSeleccionado.id, nuevoTurno)
      //   .then(
      //     () => this.reservaService.eliminar(this.turnoSeleccionado.idEsp, this.turnoSeleccionado.fecha)
      //   )
      //   .then(
      //     () => {
      //       this.modoNormal = true;
      //       this.modoCancelar = false;
      //     }
      //   )
    }

    rechazarTurnoHandler(turno: any) {
      this.turnoSeleccionado = turno;

      this.modoNormal = false;
      this.modoRechazar = true;
    }
    rechazarConfirmarHandler(razon: string) {
      const nuevoTurno = {
        estado: 'rechazado',
        razon: razon
      };

    //   this.turnoService.actualizar(this.turnoSeleccionado.id, nuevoTurno)
    //     .then(
    //       () => this.reservaService.eliminar(this.turnoSeleccionado.idEsp, this.turnoSeleccionado.fecha)
    //     )
    //     .then(
    //       () => {
    //         this.modoNormal = true;
    //         this.modoRechazar = false;
    //       }
    //     )
    }

    completarEncuestaHandler() {

    }

    calificarAtencionHandler(turno: any) {
      this.turnoSeleccionado = turno;

      this.modoNormal = false;
      this.modoCalificarAtencion = true;
    }
    calificarConfirmarHandler(review: string) {
      // this.turnoService.actualizar(this.turnoSeleccionado.id, {reviewPac: review})
      //   .then(
      //     () => {
      //       this.modoNormal = true;
      //       this.modoCalificarAtencion = false;
      //     }
      //   )
    }

    verReviewHandler(turno: Turno | null) {
      this.estado = 'resena'
      this.turnoSeleccionado = turno;
     
    }

    aceptarTurnoHandler(turno: any) {
      this.turnoService.actualizar(turno.id, {estado: 'aceptado'});
    }

    finalizarTurnoHandler(turno: any) {
      this.turnoSeleccionado = turno;

      this.modoNormal = false;
      this.modoFinalizar = true;
    }
    finalizarConfirmarHandler(reviewEHistoriaClinica: {review:string, historiaClinica:any}) {
      const review = reviewEHistoriaClinica.review;
      const hc = reviewEHistoriaClinica.historiaClinica;

      // this.usuarioService.updatePaciente(this.turnoSeleccionado.idPac, hc)
      //   .then(
      //     () => {
      //       const turnoActualizado = {
      //         estado: 'realizado',
      //         reviewEsp: review,
      //         paciente: {
      //           ...this.turnoSeleccionado.paciente,
      //           historiaClinica: hc
      //         }
      //       };

      //     this.turnoService.actualizar(this.turnoSeleccionado.id, turnoActualizado)
      //       .then(
      //         () => this.reservaService.eliminar(this.turnoSeleccionado.idEsp, this.turnoSeleccionado.fecha)
      //       )
      //       .then(
      //         () => {
      //           this.modoNormal = true;
      //           this.modoFinalizar = false;
      //         }
      //       )
      //   });
        
    }
}
