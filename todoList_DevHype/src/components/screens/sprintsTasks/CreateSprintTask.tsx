import styles from "./CreateSprintTask.module.css"
import { hash } from "sha-256";
import useTaskAndSprintFunctions from "../../../hooks/useTaskAndSprintFunctions";
import { ITarea, TaskSprintProps, TaskState } from "../../../types/types"
import useStore from "../../../hooks/useStore";
import Swal from "sweetalert2";

const CreateSprintTask: React.FC<TaskSprintProps> = ({setModal}) => {
  
  const {addTaskToSprint} = useTaskAndSprintFunctions();
  const {sprintActivo} = useStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const task = Object.fromEntries(new FormData(e.currentTarget).entries());

    const newTask: ITarea = {
        id: hash(new Date().toISOString().toString()) as string,
        titulo: task.title as string,
        descripcion: task.description as string,
        estado: TaskState.PENDIENTE,
        fechaLimite: task.date as string
      };

      try {
        await addTaskToSprint(sprintActivo!.id, newTask).then(() =>{
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada con exito',
            showConfirmButton: false,
            timer: 1500
          })
        });
      } catch (error) {
          console.log('Error al crear la tarea en CreateSprintTask', error);
      }finally{
        setModal({createSprintTaskModal: false})
      }
  }

  return (
    <div className={styles.createSprintTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({createSprintTaskModal: false})}>X</button>
        <div className={styles.createSprintTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.createSprintTask_form}>
                <div>
                  <label htmlFor="title">Título</label>
                  <input type="text" name="title" placeholder="Título de la tarea" required/>
                </div>
                <div>
                  <label htmlFor="description">Descripción</label>
                  <input type="text" name="description" placeholder="Descripción de la tarea" required/>
                </div>
                <div>
                  <label htmlFor="date">Fecha límite</label>
                  <input type="date" name="date" required></input>
                </div>
                <div>
                  <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateSprintTask
