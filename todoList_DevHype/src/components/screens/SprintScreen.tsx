import styles from './SprintScreen.module.css'
import { useParams } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { sprintStore } from '../../store/sprintStore';
import { useShallow } from 'zustand/shallow';

// SprintList Controllers
import { 
    getSprintListController,
    createSprintController,
    updateSprintController,
    deleteSprintController
 } from '../../data/sprintListController'; 

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

    const sprint = sprints.find((s) => s.id === id);


    if (!sprint) return <p className={styles.error}>Sprint no encontrado</p>;

    return (
        <div className={styles.sprint_container}>
            <h1>{sprint.nombre}</h1>
            <div className={styles.task_sections}>
                <div className={styles.task_column}>
                    <h2>Pendiente</h2>
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

                <div className={styles.task_column}>
                    <h2>En Progreso</h2>
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

                <div className={styles.task_column}>
                    <h2>Completado</h2>
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
    );
};

export default SprintScreen;
