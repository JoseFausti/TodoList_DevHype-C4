import styles from "./EditSprintTask.module.css"
import Swal from "sweetalert2";
import useStore from "../../../hooks/useStore";
import useTaskAndSprintFunctions from "../../../hooks/useTaskAndSprintFunctions";
import { ITarea, TaskSprintProps, TaskState } from "../../../types/types"

const EditSprintTask: React.FC<TaskSprintProps> = ({setModal}) => {
  const {editTaskInSprint} = useTaskAndSprintFunctions();
  const {tareaActiva, setTareaActiva, sprintActivo} = useStore(); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

  const task_ = Object.fromEntries(new FormData(e.currentTarget).entries());

  const newTask: ITarea = {
      id: tareaActiva!.id as string,
      titulo: task_.title as string,
      descripcion: task_.description as string,
      estado: tareaActiva!.estado as TaskState,
      fechaLimite: task_.date as string
    };
  
    try {
      await editTaskInSprint(sprintActivo!.id, newTask).then(() =>{
        Swal.fire({
          icon: 'success',
          title: 'Tarea editada con exito',
          showConfirmButton: false,
          timer: 1500
        })
      });
    } catch (error) {
        console.log('Error al editar la tarea en EditTask', error);
    }finally{
      setModal({editSprintTaskModal: false})
    }
  }

  return (
    <div className={styles.editSprintTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({editSprintTaskModal: false})}>X</button>
        <div className={styles.editSprintTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.editSprintTask_form}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input onChange={(e) => {setTareaActiva({...tareaActiva!, titulo: e.target.value})}} type="text" name="title" placeholder="Título de la tarea" value={tareaActiva?.titulo} required/>
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <input onChange={(e) => {setTareaActiva({...tareaActiva!, descripcion: e.target.value})}} type="text" name="description" placeholder="Descripción de la tarea" value={tareaActiva?.descripcion} required/>
                </div>
                <div>
                    <label htmlFor="date">Fecha límite</label>
                    <input onChange={(e) => {setTareaActiva({...tareaActiva!, fechaLimite: e.target.value})}} type="date" name="date" value={tareaActiva?.fechaLimite} required></input>
                </div>
                <div>
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditSprintTask
