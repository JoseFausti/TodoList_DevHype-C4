import { createTaskBacklogController } from "../data/backlogController";
import { ITarea } from "../types/types";
import useStore from "./useStore";

const useTaskFunctions = () => {

    const {backlog, setTarea} = useStore();

    // Funcion crear tarea
    const createTask = async(newTask: ITarea)=>{
        try {
            await createTaskBacklogController(newTask);
            setTarea([...backlog, newTask])
        } catch (error) {
            console.log('Error al crear la tarea en BacklogScreen', error);
        }
    }

    return (
        {
            createTask
        }
    )
}

export default useTaskFunctions
