import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import Especialidad from 'src/app/interfaces/Especialidad';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Profesional } from 'src/app/interfaces/Profesional';
import Reserva from 'src/app/interfaces/Reserva';
import { Turno } from 'src/app/interfaces/Turno';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos-solicitar',
  templateUrl: './turnos-solicitar.component.html',
  styleUrls: ['./turnos-solicitar.component.scss'],
})
export class TurnosSolicitarComponent implements OnInit {
  idPac: string = '';
  idEsp: string = '';
  loading: boolean = false;
  especialidades: Especialidad[] = [];
  selectedEspecialidad: string = '';

  especialidadDetails!: FormGroup;
  img: string = '../../assets/icon-clinica.png';
  profesionales: Profesional[] = [];
  selectedProfesional: Profesional | null = null;
  selectedPaciente!: any;

  reservasProfesional: Reserva[] = [];
  selectedReserva: Reserva | null = null;

  fecha: string = '';
  selecHora: string = '';
  turnoSolicitado!: Turno;
  especialida_step = false;
  profecional_step = false;
  fecha_step = false;
  hora_step = false;
  confirmar_step = false;
  miRol: string = '';
  step = 1;
  constructor(
    private formBuilder: FormBuilder,
    private clinicaFire: ClinicaService,
    private authFire: AuthService,
    private turnosFire: TurnoService,
    private otroService: OtroService
  ) {}

  ngOnInit() {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe(
      ds => {
      this.miRol = ds.data().rol;
        if(this.miRol == 'Administrador'){
          //Ya veremos que q va ser el administradoR
        }else if(this.miRol == 'Paciente'){
          this.clinicaFire.getUserByID(ds.id).then(resp => {
            this.idPac = ds.id;
            this.selectedPaciente = resp.data() as Paciente;
          })
        }
      }
    )
    this.clinicaFire.getEspecialidad().subscribe((resp) => {
      this.especialidades = resp;
    });
    this.especialidadDetails = this.formBuilder.group({
      especialidad: [null, Validators.required],
    });
  }

  selectProfesional(profesional: Profesional) {
    this.selectedProfesional = profesional;
    if (this.selectedProfesional && this.selectedProfesional.id) {
      this.idEsp = this.selectedProfesional.id;

      this.clinicaFire
        .getHorariosDisponibles(this.selectedProfesional.id)
        .subscribe((reservas) => {
          this.reservasProfesional = reservas;
        });
    }
  }

  next() {
    if (this.step == 1) {
      const especialidadElegida = this.especialidadDetails.value.especialidad;
      this.onEspecialidadSeleccionadaHandler(especialidadElegida);
      this.especialida_step = true;
      this.step++;
    } else if (this.step == 2) {
      this.profecional_step = true;
      this.step++;
    } else if (this.step == 3) {
      this.fecha_step = true;
      this.onRellenarTurno();
      this.step++;
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.especialida_step = false;
    }
    if (this.step == 2) {
      this.profecional_step = false;
    }
    if (this.step == 3) {
      this.fecha_step = false;
    }
  }

  submit() {
    this.loading = true;
    this.turnosFire
      .add(this.turnoSolicitado)
      .then(() => {
        this.loading = false;
        console.log('se agrego correctament');
      })
      .catch((er) => {
        this.loading = false;
        console.log(er);
      });
  }
  onRellenarTurno() {
    if (this.selectedProfesional !== null) {
      this.turnoSolicitado = {
        idEsp: this.idEsp,
        idPac: this.idPac,
        especialista: this.selectedProfesional,
        paciente: this.selectedPaciente,
        fecha: this.fecha,
        hora: this.selecHora,
        especialidad: this.especialidadDetails.value.especialidad,
        estado: 'reservado', 
        reviewEsp: '',
        reviewPac: '',
      };
    }
  }
  onEspecialidadSeleccionadaHandler(especialidad: string) {
    this.especialidadDetails.get('especialidad')?.setValue(especialidad);
    this.clinicaFire
      .getProFesionalPorEspecialidad(especialidad)
      .subscribe((profesionales: Profesional[]) => {
        this.profesionales = profesionales;
      });
  }
  onselectReserva(fecha: string, hora: string) {
    this.fecha = fecha;
    this.selecHora = hora;
  }
  onselectHora(hora: string) {
    this.selecHora = hora;
  }
}
