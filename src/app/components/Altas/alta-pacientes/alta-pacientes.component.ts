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
import { ObraSocial } from 'src/app/interfaces/ObraSocial';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-alta-pacientes',
  templateUrl: './alta-pacientes.component.html',
  styleUrls: ['./alta-pacientes.component.scss'],
})
export class AltaPacientesComponent implements OnInit {
  paciente: FormGroup;
  file: any;
  file2: any;
  obraSociales: ObraSocial[] = [];
  selectedObraSocial: string | null = null;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private clinicaFire: ClinicaService,
    private storage: Storage,
    private auth: AuthService
  ) {
    this.paciente = this.fb.group({
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
      obraSocial: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagen: [''],
      imagen2: [''],
      rol: ['Paciente'],
    });
  }

  ngOnInit(): void {
    this.clinicaFire.getObraSocial().subscribe((data) => {
      this.obraSociales = data;
    });
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
  uploadImage2($even: any) {
    this.file2 = $even.target.files[0];
  }
  async addPaciente() {
    try {
      this.loading = true;
      if (this.file) {
        const Url = await this.uploadFile(this.file);
        this.paciente.patchValue({ imagen: Url });
      }
      if (this.file2) {
        const Url = await this.uploadFile(this.file2);
        this.paciente.patchValue({ imagen2: Url });
      }
      const email = this.paciente.value.mail;
      const password = this.paciente.value.password;
      const respuesta = await this.auth.registerUser(email, password);
      if (respuesta) {
        console.log('se creo un nuevo registro');
        const id = respuesta.user.uid;
        console.log(id);
        this.paciente.patchValue({ password: '' });
        const paciente = this.paciente.value;
        await this.clinicaFire.addPaciente(paciente, id);
      }
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      this.paciente.reset();
      this.loading = false;
    }
  }
  async uploadFile(file: any) {
    const imgRef = ref(this.storage, `images/${this.file.name}`);
    const snapshot = await uploadBytes(imgRef, file);
    return await getDownloadURL(imgRef);
  }
  // async verificarCorreo() {
  //   this.auth.getUserLogged();
  // }
}
