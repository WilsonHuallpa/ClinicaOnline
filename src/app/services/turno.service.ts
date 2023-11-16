import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  onSnapshot,
  updateDoc,
  where,
  query
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Turno } from '../interfaces/Turno';


@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  turnos = collection(this.fire, 'turnos');

  constructor(private fire: Firestore) {}

  add(objeto: any) {
    return addDoc(this.turnos, objeto);
  }

  actualizar(id: string, objeto: any) {
    const docRef = doc(this.fire, 'turnos', id);
    return updateDoc(docRef, objeto);
  }

  getTurnos(): Observable<Turno[]> {
    return collectionData(this.turnos, { idField: 'id' }) as Observable<Turno[]>;
  }

  getTurnoPorid(tipoID: string, uid: string): Observable<Turno[]> {
    const q = query(
      this.turnos,
      where(tipoID, '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Turno[]>;
  }
}
