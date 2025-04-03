// Interfaces
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


// FC Props
export interface CreateTaskProps {
    setModal: (modalState: Record<string, boolean>) => void; // Record: Mejor opcion para tipar un objeto
}

export interface ViewTaskProps {
    task: ITarea;
    setModal: (modalState: Record<string, boolean>) => void;
}

export interface EditTaskProps{
    task: ITarea;
    setModal: (modalState: Record<string, boolean>) => void;
}

export interface TaskModalProps{
    activeModal: Record<string, boolean>;
    setTaskModal: (modalState: Record<string, boolean>) => void;
    tarea?: ITarea;
}