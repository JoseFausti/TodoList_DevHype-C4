import styles from './SprintScreen.module.css'
import { Link, useParams } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { sprintStore } from '../../store/sprintStore';
import { useShallow } from 'zustand/shallow';

const SprintScreen = () => {
    // Parametro del id extraido de react-router-dom
    const { id } = useParams();
    
    // Estado del Sprint
    const {
        sprints,
        sprintActivo,
        setSprint,
        setSprintActivo
    }
    = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        sprintActivo: state.sprintActivo,
        setSprint: state.setSprint,
        setSprintActivo: state.setSprintActivo
    })))

    // Filtramos del estado el sprint obtenido por el id de la url
    const sprint = sprints.find((s) => s.id === id);

    if (!sprint) return <p className={styles.error}>Sprint no encontrado</p>;

    return (
        <>
            <div className={styles.backlog_container}>
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
                                    <button className={styles.btn_edit}><FaEdit /></button>
                                    <button className={styles.btn_delete}><FaTrash /></button>
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>

                {/* Sprint Main */}
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
                                <div key={tarea.id} className={styles.task_card}>
                                    <p>{tarea.titulo}: {tarea.descripcion}</p>
                                    <div className={styles.task_actions}>
                                        <button className={styles.view_btn}><FaEye /></button>
                                        <button className={styles.edit_btn}><FaEdit /></button>
                                        <button className={styles.delete_btn}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.task_column_in_progress}>
                            <h3><b>En Progreso</b></h3>
                            {sprint.tareas.filter(t => t.estado === "en progreso").map((tarea) => (
                                <div key={tarea.id} className={styles.task_card}>
                                    <p>{tarea.titulo}: {tarea.descripcion}</p>
                                    <div className={styles.task_actions}>
                                        <button className={styles.view_btn}><FaEye /></button>
                                        <button className={styles.edit_btn}><FaEdit /></button>
                                        <button className={styles.delete_btn}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.task_column_completed}>
                            <h3><b>Completado</b></h3>
                            {sprint.tareas.filter(t => t.estado === "completado").map((tarea) => (
                                <div key={tarea.id} className={styles.task_card}>
                                    <p>{tarea.titulo}: {tarea.descripcion}</p>
                                    <div className={styles.task_actions}>
                                        <button className={styles.view_btn}><FaEye /></button>
                                        <button className={styles.edit_btn}><FaEdit /></button>
                                        <button className={styles.delete_btn}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default SprintScreen;
