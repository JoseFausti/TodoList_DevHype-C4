export interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fechaLimite: string;
}

export interface Sprint {
    id: string;
    nombre: string;
    fechaInicio: string;
    fechaCierre: string;
    tareas: Tarea[];
}