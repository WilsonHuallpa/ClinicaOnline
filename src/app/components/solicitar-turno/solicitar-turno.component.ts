import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap,of } from 'rxjs';
import Especialidad from 'src/app/interfaces/Especialidad';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Profesional } from 'src/app/interfaces/Profesional';
import { animaciones } from 'src/app/others/animaciones';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
  animations: animaciones
})
export class SolicitarTurnoComponent implements OnInit {
  especialidades: Especialidad[] = [];
  especialistas: Profesional[] = [];
  pacientes: Paciente[] = [];

  paso0: boolean = false;
  paso1: boolean = false;
  paso2: boolean = false;
  paso3: boolean = false;
  paso4: boolean = false;
  paso5: boolean = false;

  arrayDeArraysDeFechas: Array<Array<Date | null>> = [];
  idEsp: string = '';
  idPac: string = '';
  franjaHoraria: number[] = [];

  pacienteElegido: any;
  especialidadElegida: string = '';
  especialistaElegido!: Profesional;
  fechaElegida: Date | null = null;

  usuarioActual: any;
  uid: string = '';

  constructor(
    private router: Router,
    private usuarioService: ClinicaService,
    private reservaService: ReservaService,
    private turnoService: TurnoService,
    private otroService: OtroService
  ) {}

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
      this.uid = ds.id;
      this.usuarioActual = ds.data();

      if (this.usuarioActual.rol === 'Paciente') {
        this.paso1 = true;
      } else if (this.usuarioActual.rol === 'Administrador') {
        this.paso0 = true;
        this.usuarioService.getPaciente().subscribe((data) => {
          this.pacientes = data;
        });
      }
    });

    this.usuarioService
      .getEspecialidad()
      .subscribe((qs) => (this.especialidades = qs));

    for (let i = 8; i < 19; i++) this.franjaHoraria.push(i);
  }

  rellenarHorarios() {
    const reservas: number[] = [];

  this.reservaService.getReserva(this.idEsp)
    .pipe(
      switchMap((qs) => {
        qs.forEach((doc) => reservas.push(doc['data']().fecha.toDate().valueOf()));
        return of(null);  // Emisión ficticia para continuar el flujo
      }),
      tap(() => {
        for (let i = 0; i < 15; i++) {
          const fecha = new Date();
          fecha.setDate(fecha.getDate() + i);
          this.arrayDeArraysDeFechas.push([]);

          const dia = fecha.getDay();
          const horas = dia !== 6 ? 19 : 14;

          if (this.especialistaElegido && this.especialistaElegido.agenda) {
            if (this.especialistaElegido.agenda[dia]) {
              for (let j = 8; j < horas; j++) {
                const nuevaFecha = new Date(fecha);
                nuevaFecha.setHours(j, 0, 0, 0);

                if (reservas.indexOf(nuevaFecha.valueOf()) < 0) {
                  this.arrayDeArraysDeFechas[i].push(nuevaFecha);
                } else {
                  // Sirve para generar el <td> vacío,
                  // pero quizá sea mejor manejarlo en el template
                  this.arrayDeArraysDeFechas[i].push(null);
                }
              }
            }
          }
        }
      })
    )
    .subscribe(() => {
      // Puedes poner código aquí si necesitas ejecutar algo después de que todo esté completo.
    });
  }

  onPacienteSeleccionadoHandler(paciente: any) {
    this.paso0 = false;
    this.paso1 = true;

    this.pacienteElegido = paciente.data;
    this.idPac = paciente.id;
  }

  onEspecialidadSeleccionadaHandler(especialidad: Especialidad) {
    this.especialidadElegida = especialidad.nombre;

    this.usuarioService.getProFesionalPorEspecialidad(this.especialidadElegida)
    .subscribe((profesionales: Profesional[]) => {
      this.especialistas = profesionales;
      this.paso1 = false;
      this.paso2 = true;
    });
  }

  onEspecialistaSeleccionadoHandler(especialista: any) {
    this.paso2 = false;
    this.paso3 = true;

    this.especialistaElegido = especialista.data;
    this.idEsp = especialista.id;

    this.rellenarHorarios();
  }

  onFechaSeleccionadaHandler(fecha: Date) {
    this.paso3 = false;
    this.paso4 = true;

    this.fechaElegida = fecha;
  }

  onCancelarReservaHandler() {
    this.paso3 = true;
    this.paso4 = false;

    this.fechaElegida = null;
  }

  onConfirmarReservaHandler() {
    if (this.fechaElegida) {
      this.reservaService.add(this.idEsp, this.fechaElegida)
        .then(() => this.agregarTurno());
    }
  }

  agregarTurno() {
    if (this.usuarioActual.rol === 'paciente') {
      this.pacienteElegido = this.usuarioActual;
      this.idPac = this.uid;
    }

    const turno = {
      idPac: this.idPac,
      paciente: this.pacienteElegido,
      idEsp: this.idEsp,
      especialista: this.especialistaElegido,
      fecha: this.fechaElegida,
      especialidad: this.especialidadElegida,
      estado: 'reservado',
    };

    this.turnoService.add(turno).then(() => {
      this.paso4 = false;
      this.paso5 = true;
    });
  }

  regresar() {
    if (this.usuarioActual.rol === 'paciente') {
      this.router.navigateByUrl('/paciente/mis-turnos');
    } else if (this.usuarioActual.rol === 'administrador') {
      this.router.navigateByUrl('/administrador/turnos');
    }
  }
}
