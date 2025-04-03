import styles from '../screens/BacklogScreen.module.css'
import { Link } from "react-router-dom"
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import useStore from '../../hooks/useStore'

export const SprintList = () => {

    const {sprints, setSprintActivo} = useStore();

    return (
        <>
            <div className={styles.aside_container}>
                <Link to={'/'} ><button className={styles.backlog_btn}>Backlog</button></Link>
                {/* Lista de Sprints */}
                <aside className={styles.sprint_list}>
                    <div className={styles.sprint_list_header}>
                        <h2>Lista de Sprints</h2>
                        <button onClick={()=>{}}>+</button> {/* Completar funcionalidad de agregar sprint */}
                    </div>
                    {sprints.map((sprint) => (
                        <div className={styles.sprint_card} key={sprint.id}>
                            <h3>{sprint.nombre}</h3>
                            <p><b>Cierre:</b> {sprint.fechaCierre}</p>
                            <p><b>Inicio:</b> {sprint.fechaInicio}</p>
                            <div className={styles.sprint_actions}>
                                <Link to={`/sprint/${sprint.id}`} onClick={()=>{setSprintActivo(sprint)}}><button className={styles.btn_view}><FaEye /></button></Link>
                                <button className={styles.btn_edit} onClick={()=>{setSprintActivo(sprint)}}><FaEdit /></button>
                                <button className={styles.btn_delete} onClick={()=>{setSprintActivo(sprint)}}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </aside>
            </div>
        </>
    )
}

export default SprintList
