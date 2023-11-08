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
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss']
})
export class AltaAdminComponent implements OnInit{
  admin: FormGroup;
  file: any;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clinicaFire: ClinicaService,
    private storage: Storage
  ) {
    this.admin = this.fb.group({
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
      rol:['Administrador']
    });
  }

  ngOnInit(): void {}
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

  async addAdministrador() {
    try {
      this.loading = true;
      if(this.file) {
        const Url = await this.uploadFile(this.file);
        this.admin.patchValue({ imagen: Url });
      }
      const admin = this.admin.value;
      const rep = await this.clinicaFire.addAdministrador(admin)
      console.log('respuesta de firestores: ', rep)
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
}
