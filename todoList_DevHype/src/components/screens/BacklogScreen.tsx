import styles from './BacklogScreen.module.css'
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { backlogStore } from "../../store/backlogStore";
import { sprintStore } from "../../store/sprintStore";

const BacklogScreen = () => {

    // Estado del Backlog
    const {
        backlog, 
        tareaActiva, 
        setTarea, 
        setTareaActiva
    } 
    = backlogStore(useShallow((state) => ({
        backlog: state.backlog,
        tareaActiva: state.tareaActiva,
        setTarea: state.setTarea,
        setTareaActiva: state.setTareaActiva
    })))

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

    return (
        <div className={styles.backlog_container}>

            {/* Lista de Sprints */}
            <aside className={styles.sprint_list}>
                <h2>Lista de Sprints</h2>
                {sprints.map((sprint) => (
                    <div className={styles.sprint_card} key={sprint.id}>
                        <h3>{sprint.nombre}</h3>
                        <p><b>Inicio:</b> {sprint.fechaInicio}</p>
                        <p><b>Cierre:</b> {sprint.fechaCierre}</p>
                        <div className={styles.sprint_actions}>
                            <button className={styles.btn_view}><Link to={`/sprint/${sprint.id}`}><FaEye /> </Link></button>
                            <button className={styles.btn_edit}><FaEdit /></button>
                            <button className={styles.btn_delete}><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </aside>
            
            {/* Backlog */}
            <main className={styles.backlog_main}>
                <h1>Backlog</h1>
                <button className={styles.btn_add_task}><FaPlus /> Crear tarea</button>
                <div className={styles.task_list}>
                    {backlog.map((tarea) => (
                        <div className={styles.task_card} key={tarea.id}>
                            <p><b>{tarea.titulo}</b>: {tarea.descripcion}</p>
                            <div className={styles.task_actions}>
                                <button className={styles.btn_move}><FaArrowRight /> Enviar a</button>
                                <select className={styles.sprint_select}>
                                    <option>Seleccione una sprint</option>
                                    {sprints.map(sprint => (
                                        <option key={sprint.id} value={sprint.id}>{sprint.nombre}</option>
                                    ))}
                                </select>
                                <button className={styles.btn_view}><FaEye /></button>
                                <button className={styles.btn_edit}><FaEdit /></button>
                                <button className={styles.btn_delete}><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default BacklogScreen;

