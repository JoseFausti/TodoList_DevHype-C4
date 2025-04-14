import styles from './CreateSprint.module.css'
import { hash } from 'sha-256';
import useTaskAndSprintFunctions from '../../../hooks/useTaskAndSprintFunctions';
import { ISprint, TaskSprintProps } from '../../../types/types';
import Swal from 'sweetalert2';

const CreateSprint: React.FC<TaskSprintProps> = ({setModal}) => {

    const {createSprint} = useTaskAndSprintFunctions();
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    
        const sprint = Object.fromEntries(new FormData(e.currentTarget).entries());
    
        const newSprint: ISprint = {
            id: hash(new Date().toISOString().toString()) as string,
            nombre: sprint.name as string,
            fechaInicio: sprint.initialDate as string,
            fechaCierre: sprint.finalDate as string,
            tareas: []
        };
  
        try {
          await createSprint(newSprint).then(() =>{
            Swal.fire({
              icon: 'success',
              title: 'Sprint creado con exito',
              showConfirmButton: false,
              timer: 1500
            })
          });
        } catch (error) {
            console.log('Error al crear el sprint en CreateSprint', error);
        }finally{
          setModal({createSprintModal: false})
        }
    }
  
    return (
      <div className={styles.createSprint_modal_container}>
          <button className={styles.btn_close} onClick={() => setModal({createSprintModal: false})}>X</button>
          <div className={styles.createSprint_form_container}>
              <form onSubmit={(e) => {handleSubmit(e)}} className={styles.createSprint_form}>
                  <div>
                    <label htmlFor="name">Título</label>
                    <input type="text" name="name" placeholder="Nombre del sprint" required/>
                  </div>
                  <div>
                    <label htmlFor="initialDate">Fecha inicio</label>
                    <input type="date" name="initialDate" required/>
                  </div>
                  <div>
                    <label htmlFor="finalDate">Fecha cierre</label>
                    <input type="date" name="finalDate" required></input>
                  </div>
                  <div>
                    <button type="submit">Crear</button>
                  </div>
              </form>
          </div>
      </div>
    )
}

export default CreateSprint
