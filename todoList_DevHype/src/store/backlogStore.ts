import { create } from "zustand";
import { Tarea } from "../types/types";

interface BacklogStore{
    backlog: Tarea[],
    tareaActiva: Tarea | null,
    setTarea: (tareas: Tarea[]) => void;
    setTareaActiva: (tarea: Tarea | null) => void;
}

export const backlogStore = create<BacklogStore>((set) => ({
    backlog: [],
    tareaActiva: null,
    setTarea: (tareas: Tarea[]) => set(()=> ({ backlog: tareas })),
    setTareaActiva: (tarea: Tarea | null) => set(()=> ({ tareaActiva: tarea }))
}));