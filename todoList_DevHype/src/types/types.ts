export interface ITarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fechaLimite: string;
}

export interface IBacklog{
    tareas: ITarea[]
}

export interface ISprint {
    id: string;
    nombre: string;
    fechaInicio: string;
    fechaCierre: string;
    tareas: ITarea[];
}

export interface ISprintList {
    sprints: ISprint[]
}