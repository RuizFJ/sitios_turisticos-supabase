import type Categoria from "./categoria.interface";
import type Ciudad from "./ciudad.interface";

export default interface SitioTuristico {

    id: number;
    nombre: string;
    descripcion: string;
    direccion: string;
    active: boolean;
    categoria_id: Categoria;
    ciudad_id: Ciudad;
    
}

export interface AddSitioTuristico {
    id?: number;
    nombre: string;
    descripcion: string;
    direccion: string;
    categoria_id: number;
    ciudad_id: number;  
}