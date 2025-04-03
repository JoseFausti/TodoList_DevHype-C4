import styles from "./EditTask.module.css"
import { EditTaskProps, ITarea } from "../../../types/types"
import useTaskFunctions from "../../../hooks/useTaskFunctions";
import Swal from "sweetalert2";

const EditTask: React.FC<EditTaskProps> = ({task, setModal}) => {

    const {editTask} = useTaskFunctions();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    
        const task_ = Object.fromEntries(new FormData(e.currentTarget).entries());
    
        const newTask: ITarea = {
            id: task.id as string,
            titulo: task_.title as string,
            descripcion: task_.description as string,
            estado: task.estado as string,
            fechaLimite: task_.date as string
          };
    
          try {
            await editTask(newTask).then(() =>{
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
            setModal({editTaskModal: false})
          }
      }

  return (
    <div className={styles.editTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({editTaskModal: false})}>X</button>
        <div className={styles.editTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.editTask_form}>
                <div>
                    <label htmlFor="title">Título</label>
                    <input onChange={(e) => {task.titulo = e.target.value}} type="text" name="title" placeholder="Título de la tarea" value={task.titulo} required/>
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <input onChange={(e) => {task.descripcion = e.target.value}} type="text" name="description" placeholder="Descripción de la tarea" value={task.descripcion} required/>
                </div>
                <div>
                    <label htmlFor="date">Fecha límite</label>
                    <input onChange={(e) => {task.fechaLimite = e.target.value}} type="date" name="date" value={task.fechaLimite} required></input>
                </div>
                <div>
                    <button type="submit">Editar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditTask
