import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Turno } from 'src/app/interfaces/Turno';
import { ClinicaService } from 'src/app/services/clinica.service';
import { OtroService } from 'src/app/services/otro.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Estado } from '../mis-turnos/mis-turnos.component';
import { Profesional } from 'src/app/interfaces/Profesional';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-seccion-paciente',
  templateUrl: './seccion-paciente.component.html',
  styleUrls: ['./seccion-paciente.component.scss'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition(':enter', [
        animate('500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
    trigger('slideInFromBottom', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms ease-in-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ]),
    ]),
  ],

})
export class SeccionPacienteComponent implements OnInit {
  miRol: string;
  miUID: string;
  idTipo: string = 'idPac';
  pacientes: Paciente[] = [];
  turnos: Turno[] = [];
  estado: Estado = 'cancelar';
  loading: boolean = false;
  turnoSeleccionado: Turno | null = null;
  doctores: Profesional[] = [];
  selectedDoctor: string = '';
  filtro: string = '';
  constructor(
    private otroService: OtroService,
    private turnoService: TurnoService,
    private clinicaFire: ClinicaService
  ) {}

  ngOnInit(): void {
    this.otroService.getDocumentSnapshotDeUsuario().subscribe((ds) => {
      this.miRol = ds.data().rol;
      if (this.miRol === 'Administrador') {
        this.clinicaFire.getPaciente().subscribe((dpacientes) => {
          this.pacientes = dpacientes;}
          );
      } else {
        this.miUID = ds.id;
        if (this.miRol === 'Profesional') {
          this.idTipo = 'idEsp';
        }
        //obtene todos los pacienete del profesional
        //this.obtenerTurnos(this.idTipo, this.miUID);
      }
    });
  }

  handlePatientClick(selectedPatient: Paciente): void {
    if(selectedPatient && selectedPatient.id){
      this.doctores = []
      this.miUID = selectedPatient.id;
      this.obtenerTurnos('idPac', selectedPatient.id);
    }
  }
  obtenerTurnos(idTipo: string, miUID: string) {
    this.turnoService
      .getTurnoPorid(idTipo, miUID)
      .subscribe((data) => {
        this.turnos = data;
      });
  }
  pacienteFiltrar() {
    if (this.filtro) {
      console.log(this.filtro)
      this.turnos = this.turnos.filter(turno =>
        this.matchFilter(turno, this.filtro.toLowerCase())
      );
    } else {
      console.log('error', this.filtro)
      this.obtenerTurnos(this.idTipo, this.miUID);
    }
  }
  
  matchFilter(turno: Turno, filtro: string): boolean {
    const lowerCaseFiltro = filtro.toLowerCase();
    return (
      (turno.especialista && turno.especialista.nombre.toLowerCase().includes(lowerCaseFiltro)) ||
      (turno.especialista && turno.especialista.apellido.toLowerCase().includes(lowerCaseFiltro))
    );
  }
  cancelarTurnoHandler(turno: Turno | null) {
    this.estado = 'cancelar';
    this.turnoSeleccionado = turno;
  }

  verReviewHandler(turno: Turno | null) {
    this.estado = 'resena';
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
    this.estado = 'rechazado';
    this.turnoSeleccionado = turno;
  }
  aceptarTurnoHandler(turno: Turno) {
    if (turno.id) {
      this.loading = true;
      turno.estado = 'aceptado';
      this.turnoService
        .actualizar(turno.id, turno)
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  finalizarTurnoHandler(turno: Turno | null) {
    this.estado = 'finalizado';
    this.turnoSeleccionado = turno;
  }
  crearHistorialClinica(turno: Turno | null) {
    this.estado = 'historial';
    this.turnoSeleccionado = turno;
  }
  async crearPdf() {
    const bodyData = [];
    bodyData.push(['Especialidad', 'Doctor', 'Historial', 'Fecha', 'Hora']);
  
    this.turnos.forEach((turno) => {
      const rowData = [
        turno.especialidad,
        this.miRol === 'Paciente' || this.miRol === 'Administrador'
          ? `${turno.especialista.nombre} ${turno.especialista.apellido}`
          : '',
        turno.historial
          ? `Altura: ${turno.historial.altura} - Peso: ${turno.historial.peso} - Temperatura: ${turno.historial.temperatura} \n Presion: ${turno.historial.presion} - Clave: ${turno.historial.clave1} - Valor: ${turno.historial.valor1}`
          : 'Sin Historial',
        turno.fecha,
        turno.hora,
      ];
  
      bodyData.push(rowData);
    });
  
    const docDefinition = {
      content: [
        {
          layout: 'noBorders',
          table: {
            widths: ['*', 'auto', '*'],
            body: [
              [
                {
                  image: await this.getBase64ImageFromURL(
                    "../../../assets/icon-clinica.png"
                  ),
                  width: 60, // Ajusta el ancho según tus necesidades
                  alignment: 'left',
                },
                {
                  text: 'Clínica Online', // Nombre de tu clínica
                  style: 'subheader',
                  alignment: 'center',
                },
                {
                  text: `${new Date().toLocaleDateString()}`, // Fecha de emisión
                  alignment: 'right',
                },
              ],
            ],
          },
        },
        { text: '\n' }, // Espacio entre el encabezado y la tabla
        {
          style: 'tableExample',
          table: {
            body: bodyData,
          },
        },
      ],
  
      styles: {
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };
  
    pdfMake.createPdf(docDefinition).download('historial.pdf');
  }
  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });}
}
