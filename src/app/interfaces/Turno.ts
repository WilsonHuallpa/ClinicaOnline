import { Profesional } from "./Profesional";
import { Paciente } from "./Paciente";
export interface Turno {
    idEsp: string;
    idPac: string;
    especialista: Profesional;
    paciente: Paciente;
    // fecha: Date;
    fecha: any;
    especialidad: string;
    estado: string;
    reviewEsp: string;
    reviewPac: string;
    
    razon?: string;
}