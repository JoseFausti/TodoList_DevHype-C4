import { createTaskBacklogController, updateBacklogController } from "../data/backlogController";
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
            console.log('Error al crear la tarea en createTask', error);
        }
    }

    // Funcion para editar tarea
    const editTask = async(updatedTask: ITarea)=>{
        try {
            await updateBacklogController(updatedTask);
            setTarea(backlog.map(
                (task) => (task.id === updatedTask.id 
                    ? { ...task, ...updatedTask } 
                    : task)
                ));
        } catch (error) {
            console.log('Error al editar la tarea en editTask', error);
        }
    }

    return (
        {
            createTask, editTask
        }
    )
}

export default useTaskFunctions
