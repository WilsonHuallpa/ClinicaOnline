import { Component, OnInit } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Especialidad from 'src/app/interfaces/Especialidad';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
@Component({
  selector: 'app-alta-profesionales',
  templateUrl: './alta-profesionales.component.html',
  styleUrls: ['./alta-profesionales.component.scss']
})
export class AltaProfesionalesComponent {
  profesional: FormGroup;
  file: any;
  loading: boolean = false;
  especialidades: Especialidad[] = [];
  constructor(
    private fb: FormBuilder,
    private clinicaFire: ClinicaService,
    private storage: Storage,
    private auth: AuthService
  ) {
    this.profesional = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: [
        '',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(99),
          this.validarNumber,
        ],
      ],
      dni: ['', [Validators.required, this.validarNumber]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagen: [''],
      estado: ['Pendiente'],
      rol:['Profesional']
    });
  }

  ngOnInit(): void {
   
  }
  validarNumber(control: AbstractControl): object | null {
    const data = control.value;
    const soloNumeros = /^\d+$/;
    if (!soloNumeros.test(data)) {
      return { soloNumeros: true };
    }
    return null;
  }
  uploadImage($even: any) {
    this.file = $even.target.files[0];
  }
  
  async addprofesional() {
    try {
      this.loading = true;
      if(this.file) {
        const Url = await this.uploadFile(this.file);
        this.profesional.patchValue({ imagen: Url });
      }
      const email = this.profesional.value.mail;
      const password = this.profesional.value.password;
      const respuesta = await this.auth.registerUser(email, password);
      if(respuesta){
        console.log('se creo un nuevo registro')
        const id = respuesta.user.uid;
        this.profesional.patchValue({ password: '' });
        const profesional = this.profesional.value;
        await this.clinicaFire.addProfesional(profesional, id);
        if(this.especialidades.length > 0){
          for(const especialidad of this.especialidades) {
            if(especialidad.id){
              this.clinicaFire.addEspecialidadProfecional(especialidad.id, id)
            }
          }
        }
        this.profesional.reset();
      }
      
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this.loading = false;
    }
  }
  async uploadFile(file: any) {
    const imgRef = ref(this.storage, `images/${this.file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  }

  seleccionarEspecialidad(especialidad: Especialidad) {
    const existe = this.especialidades.find((a) => a.id === especialidad.id);

    if (!existe) {
      this.especialidades.push(especialidad);
    }
    console.log('actores: ', this.especialidades)
  }
  eliminarElemento(id: string | undefined) {
    if (id) {
      this.especialidades = this.especialidades.filter(especialidad => especialidad.id !== id);
    }
  }
}
