import { Profesional } from "./Profesional";
import { Paciente } from "./Paciente";
import Encuesta from "./Encuesta";
export interface Turno {
    id?:string;
    idEsp: string;
    idPac: string;
    especialista: Profesional;
    paciente: Paciente;
    fecha: string;
    hora:string;
    especialidad: string;
    estado: string;
    reviewEsp: string;
    reviewPac: string;
    razon?: string;
}