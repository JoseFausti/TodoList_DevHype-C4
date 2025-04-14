import Swal from 'sweetalert2';
import { ISprint, TaskSprintProps } from '../../../types/types';
import styles from './EditSprint.module.css'
import useTaskAndSprintFunctions from '../../../hooks/useTaskAndSprintFunctions';
import useStore from '../../../hooks/useStore';

const EditSprint: React.FC<TaskSprintProps> = ({setModal}) => {

    const {editSprint} = useTaskAndSprintFunctions();
    const {sprintActivo, setSprintActivo} = useStore(); 
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
    
        const sprint = Object.fromEntries(new FormData(e.currentTarget).entries());
    
        const newSprint: ISprint = {
            id: sprintActivo!.id as string,
            nombre: sprint.name as string,
            fechaInicio: sprint.initialDate as string,
            fechaCierre: sprint.finalDate as string,
            tareas: []
        };

        try {
            await editSprint(newSprint).then(() =>{
                Swal.fire({
                icon: 'success',
                title: 'Sprint editado con exito',
                showConfirmButton: false,
                timer: 1500
                })
            });
            } catch (error) {
                console.log('Error al editar el sprint en EditSprint', error);
            }finally{
                setModal({editSprintModal: false})
            }
        }
  
    return (
        <div className={styles.editSprint_modal_container}>
            <button className={styles.btn_close} onClick={() => setModal({editSprintModal: false})}>X</button>
            <div className={styles.editSprint_form_container}>
                <form onSubmit={(e) => {handleSubmit(e)}} className={styles.editSprint_form}>
                    <div>
                        <label htmlFor="name">Título</label>
                        <input onChange={(e) => {setSprintActivo({...sprintActivo!, nombre: e.target.value})}} type="text" name="name" placeholder="Título de la tarea" value={sprintActivo?.nombre} required/>
                    </div>
                    <div>
                        <label htmlFor="initialDate">Fecha inicio</label>
                        <input onChange={(e) => {setSprintActivo({...sprintActivo!, fechaInicio: e.target.value})}} type="date" name="initialDate" placeholder="Descripción de la tarea" value={sprintActivo?.fechaInicio} required/>
                    </div>
                    <div>
                        <label htmlFor="finalDate">Fecha cierre</label>
                        <input onChange={(e) => {setSprintActivo({...sprintActivo!, fechaCierre: e.target.value})}} type="date" name="finalDate" value={sprintActivo?.fechaCierre} required></input>
                    </div>
                    <div>
                        <button type="submit">Editar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSprint
