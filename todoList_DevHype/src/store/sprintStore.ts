import { create } from "zustand";
import { Sprint } from "../types/types";

interface SprintStore{
    sprints: Sprint[],
    sprintActivo: Sprint | null,
    setSprint: (sprints: Sprint[]) => void,
    setSprintActivo: (sprint: Sprint | null) => void
}

export const sprintStore = create<SprintStore>((set) => ({
    sprints: [],
    sprintActivo: null,
    setSprint: (sprints_: Sprint[]) => set(()=> ({sprints: sprints_})),
    setSprintActivo: (sprint: Sprint | null) => set(() => ({sprintActivo: sprint}))
}))