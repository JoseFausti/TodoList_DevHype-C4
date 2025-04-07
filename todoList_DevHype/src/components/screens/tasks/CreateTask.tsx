import styles from './CreateTask.module.css'
import { CreateTaskProps, ITarea } from '../../../types/types'
import {hash} from 'sha-256';
import Swal from 'sweetalert2';
import useTaskFunctions from '../../../hooks/useTaskFunctions';

const CreateTask: React.FC<CreateTaskProps> = ({ setModal }) => {

  const {createTask} = useTaskFunctions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    // entries() → Convierte un objeto en un array de pares [clave, valor]
    // fromEntries() → Convierte un array de pares [clave, valor] en un objeto
    const task = Object.fromEntries(new FormData(e.currentTarget).entries()); // FormData es un objeto especial por lo que usamos entries().

    const newTask: ITarea = {
        id: hash(new Date().toISOString().toString()) as string,
        titulo: task.title as string,
        descripcion: task.description as string,
        estado: "pendiente",
        fechaLimite: task.date as string
      };

      try {
        await createTask(newTask).then(() =>{
          Swal.fire({
            icon: 'success',
            title: 'Tarea creada con exito',
            showConfirmButton: false,
            timer: 1500
          })
        });
      } catch (error) {
          console.log('Error al crear la tarea en CreateTask', error);
      }finally{
        setModal({createTaskModal: false})
      }
  }

  return (
    <div className={styles.createTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({createTaskModal: false})}>X</button>
        <div className={styles.createTask_form_container}>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.createTask_form}>
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

export default CreateTask
