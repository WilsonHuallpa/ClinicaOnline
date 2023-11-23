import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/interfaces/Turno';
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
  ngOnInit(): void {

  }
  constructor(private turnoServices: TurnoService){

  }
  onCloseModal(): void {
    this.closeModal.emit();
  }
  cancelarTurno() {
    if(this.data && this.data.id){
      if(this.estado === 'cancelar'){
        this.data.razon = this.mensaje;
        this.data.estado = 'cancelado';
      }else if(this.estado === 'calificar'){
        this.data.reviewPac = this.mensaje
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
}
