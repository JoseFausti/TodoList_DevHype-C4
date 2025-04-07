import styles from '../screens/SprintScreen.module.css'
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/useStore';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'


const Backlog = () => {

    // Parametro del id extraido de react-router-dom
    const { id } = useParams();

    const {sprints} = useStore();

    // Filtramos del estado el sprint obtenido por el id de la url
    const sprint = sprints.find((s) => s.id === id);

    if (!sprint) return <p className={styles.error}>Sprint no encontrado</p>;

    return (
    <>
        <div className={styles.sprint_container}>
            <div className={styles.task_header}>
                <h2><b>Nombre de la Sprint:</b> {sprint.nombre}</h2>
                <div className={styles.task_header_actions}>
                    <h3>Tareas de la sprint</h3>
                    <button>Crear Tarea</button>
                </div>
            </div>
            <div className={styles.task_sections}>
                <div className={styles.task_column_pending}>
                    <h3><b>Pendiente</b></h3>
                    {sprint.tareas.filter(t => t.estado === "pendiente").map((tarea) => (
                        <div key={tarea.id} className={styles.task_card_pending}>
                            <div className={styles.task_card_legend}>
                                <h4><b>Titulo:</b> {tarea.titulo}</h4>
                                <h4><b>Descripcion:</b> {tarea.descripcion}</h4>
                                <h4><b>Fecha Limite:</b> {tarea.fechaLimite}</h4>
                            </div>
                            <div className={styles.task_actions}>
                                <div className={styles.task_actions_backlog}>
                                    <button onClick={()=>{}}>Enviar al Backlog<FontAwesomeIcon icon={faBox} style={{ marginLeft: "6px" }} /></button>
                                </div>
                                <div className={styles.switch_state}>
                                    <button onClick={()=>{}}>En Progreso<FontAwesomeIcon icon={faArrowRightLong} style={{ marginLeft: "6px" }} /></button>
                                </div>
                                <div className={styles.task_actions_btn}>
                                    <button className={styles.btn_view}><FaEye /></button>
                                    <button className={styles.btn_edit}><FaEdit /></button>
                                    <button className={styles.btn_delete}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.task_column_in_progress}>
                    <h3><b>En Progreso</b></h3>
                    {sprint.tareas.filter(t => t.estado === "en progreso").map((tarea) => (
                        <div key={tarea.id} className={styles.task_card_in_progress}>
                            <div className={styles.task_card_legend}>
                                <h4><b>Titulo:</b> {tarea.titulo}</h4>
                                <h4><b>Descripcion:</b> {tarea.descripcion}</h4>
                                <h4><b>Fecha Limite:</b> {tarea.fechaLimite}</h4>
                            </div>
                            <div className={styles.task_actions}>
                                <div className={styles.task_actions_backlog}>
                                    <button onClick={()=>{}}>Enviar al Backlog</button>
                                </div>
                                <div className={styles.switch_state}>
                                    <button onClick={()=>{}}>En progreso</button>
                                </div>
                                <div className={styles.task_actions_btn}>
                                    <button className={styles.btn_view}><FaEye /></button>
                                    <button className={styles.btn_edit}><FaEdit /></button>
                                    <button className={styles.btn_delete}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.task_column_completed}>
                    <h3><b>Completado</b></h3>
                    {sprint.tareas.filter(t => t.estado === "completado").map((tarea) => (
                        <div key={tarea.id} className={styles.task_card_completed}>
                            <div className={styles.task_card_legend}>
                                <h4><b>Titulo:</b> {tarea.titulo}</h4>
                                <h4><b>Descripcion:</b> {tarea.descripcion}</h4>
                                <h4><b>Fecha Limite:</b> {tarea.fechaLimite}</h4>
                            </div>
                            <div className={styles.task_actions}>
                                <div className={styles.task_actions_backlog}>
                                    <button onClick={()=>{}}>Enviar al Backlog</button>
                                </div>
                                <div className={styles.switch_state}>
                                    <button onClick={()=>{}}>Completado</button>
                                </div>
                                <div className={styles.task_actions_btn}>
                                    <button className={styles.btn_view}><FaEye /></button>
                                    <button className={styles.btn_edit}><FaEdit /></button>
                                    <button className={styles.btn_delete}><FaTrash /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}

export default Backlog
