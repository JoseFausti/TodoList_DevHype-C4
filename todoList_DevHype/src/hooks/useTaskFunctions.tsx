import Swal from "sweetalert2";
import { createTaskBacklogController, deleteTaskBacklogController, updateBacklogController } from "../data/backlogController";
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

    const deleteTask = async (id: string) => {
        const confirm = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar la tarea eliminada",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar'
        });
    
        if (!confirm.isConfirmed) return;
    
        try {
            await deleteTaskBacklogController(id);
            setTarea(backlog.filter((task) => task.id !== id));
            await Swal.fire('Eliminado!', 'La tarea ha sido eliminada.', 'success');
        } catch (error) {
            console.log('Error al eliminar la tarea en deleteTask', error);
        }
    };
    
    return (
        {
            createTask, editTask, deleteTask
        }
    )
}

export default useTaskFunctions
