import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { ObraSocial } from '../interfaces/ObraSocial';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/Paciente';
import { Profesional } from '../interfaces/Profesional';
import Especialidad from '../interfaces/Especialidad';
import Administrador from '../interfaces/Administrador';

@Injectable({
  providedIn: 'root',
})
export class ClinicaService {
  constructor(private fire: Firestore) {}

  //obra Social
  addObraSocial(obraSocial: ObraSocial) {
    const collRef = collection(this.fire, 'obraSocial');
    return addDoc(collRef, obraSocial);
  }
  getObraSocial(): Observable<ObraSocial[]> {
    const collRef = collection(this.fire, 'obraSocial');
    return collectionData(collRef, { idField: 'id' }) as Observable<
      ObraSocial[]
    >;
  }

  // Apaciente
  addPaciente(paciente: Paciente, id: string) {
    const collRef = collection(this.fire, 'usuarios');
    const docRef = doc(collRef, id);
    return setDoc(docRef, paciente);
  }
  getPaciente(): Observable<Paciente[]> {
    const collRef = collection(this.fire, 'usuarios');
    return collectionData(collRef, { idField: 'id' }) as Observable<Paciente[]>;
  }

  // Profesionales
  addProfesional(profesional: Profesional, id: string) {
    const collRef = collection(this.fire, 'usuarios');
    const docRef = doc(collRef, id);
    return setDoc(docRef, profesional);
  }
  updateProfesional(id: string, value: string) {
    const docRef = doc(this.fire, 'usuarios', id);
    return updateDoc(docRef, { estado: value });
  }

  getProfesionales(): Observable<Profesional[]> {
    const collRef = collection(this.fire, 'usuarios');
    const q = query(
      collRef,
      where('rol', '==', 'Profesional'),
      where('estado', '==', 'Pendiente')
    );

    return collectionData(q, { idField: 'id' }) as Observable<Profesional[]>;
  }

  addProfesionalEspecialidad(idprofesional: string, especialidad: any) {
    const aCollection = collection(
      this.fire,
      `peliculas/${idprofesional}/especialidades`
    );
    return addDoc(aCollection, especialidad);
  }

  //Especialidadesa
  addEspecialidadProfecional(especialidadID: string, id: string) {
    const collRef = collection(this.fire, `usuarios/${id}/especialidades`);
    return addDoc(collRef, { especialidadRef: especialidadID });
  }
  addEspecialidad(especialidad: Especialidad) {
    const collRef = collection(this.fire, 'especialidades');
    return addDoc(collRef, especialidad);
  }
  getEspecialidad(): Observable<Especialidad[]> {
    const collRef = collection(this.fire, 'especialidades');
    return collectionData(collRef, { idField: 'id' }) as Observable<
      Especialidad[]
    >;
  }
  getEspecialidadProfesional(id: string): Observable<[]> {
    const collRef = collection(this.fire, `usuarios/${id}/especialidades`);
    return collectionData(collRef, { idField: 'id' }) as Observable<[]>;
  }
  //administrador
  async addAdministrador(user: Administrador, id: string) {
    const collRef = collection(this.fire, 'usuarios');
    const docRef = doc(collRef, id);
    return await setDoc(docRef, user);
  }
  //usuario
  async getUserByID(id: string) {
    const collRef = collection(this.fire, 'usuarios');
    const docRef = doc(collRef, id);

    return await getDoc(docRef);
  }
}