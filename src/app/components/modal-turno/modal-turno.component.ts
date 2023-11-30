import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/interfaces/Turno';
import HistorialClinica from 'src/app/interfaces/historialClinica';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.scss']
})
export class ModalTurnoComponent implements OnInit {
  mensaje: string = '';
  @Input() data?: Turno | null;
  @Input() estado?: string;
  @Output() closeModal = new EventEmitter();
  historial: FormGroup;
 
  constructor(private turnoServices: TurnoService,  private fb: FormBuilder){
    this.historial = this.fb.group({
      altura: ['', [Validators.required, this.validarNumber]],
      peso: ['', [Validators.required, this.validarNumber]],
      temperatura: ['', [Validators.required, this.validarNumber]],
      presion: ['', [Validators.required, this.validarNumber]],
      clave1:[''],
      valor1: [''],
    });
  }
  ngOnInit(): void {
    if(this.estado === 'historial' && this.data && this.data.historial){
      console.log('entro')
      this.historial.patchValue(this.data.historial);
    }
  }
  get datosDinamicosArray() {
    return this.historial.get('datosDinamicos') as FormArray;
  }
  agregarDatoDinamico() {
    this.datosDinamicosArray.push(
      this.fb.group({
        clave: ['', Validators.required],
        valor: ['', Validators.required],
      })
    );
  }
  eliminarDatoDinamico(index: number) {
    this.datosDinamicosArray.removeAt(index);
  }

  validarNumber(control: AbstractControl): object | null {
    const data = control.value;
    const soloNumeros = /^\d+$/;
    if (!soloNumeros.test(data)) {
      return { soloNumeros: true };
    }
    return null;
  }
  onCloseModal(): void {
    this.closeModal.emit();
  }
  cancelarTurno() {
    if(this.data && this.data.id){
      if(this.estado === 'cancelar' || this.estado === 'rechazado'){
        this.data.razon = this.mensaje;
        this.data.estado = 'cancelado';
      }else if(this.estado === 'calificar' || this.estado === 'encuesta'){
        this.data.reviewPac = this.mensaje
      }else if(this.estado === 'finalizado'){
        this.data.reviewEsp = this.mensaje
        this.data.estado = 'finalizado';
      }
      this.turnoServices.actualizar(this.data.id, this.data).then(() =>{
        this.closeModal.emit();
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  isMensajePresente(): boolean {
    return this.mensaje.trim().length > 0;
  }
  addHistorialClinica(){
    if(this.data && this.data.id){
      this.data.historial = this.historial.value;
      this.turnoServices.actualizar(this.data.id, this.data).then(() =>{
        this.closeModal.emit();
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
