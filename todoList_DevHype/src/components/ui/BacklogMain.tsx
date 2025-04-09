import styles from '../screens/BacklogScreen.module.css'
import useModalState from '../../hooks/useModalState';
import useStore from '../../hooks/useStore';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowRight } from "react-icons/fa";
import TaskModal from './TaskModal';
import useTaskFunctions from '../../hooks/useTaskFunctions';

export const BacklogMain = () => {

    const {backlog, sprints, tareaActiva, setTareaActiva} = useStore();
    const {taskModal, setTaskModal } = useModalState();
    const {deleteTask} = useTaskFunctions();

    return (
        <>
            <main className={styles.backlog_main}>
                <div className={styles.backlog_main_container}>
                    <div className={styles.backlog_main_header}>
                        <h1>Backlog</h1>
                        <div>
                            <h2>Tareas en el backlog</h2>
                            <button className={styles.btn_add_task} onClick={()=>{setTaskModal({...taskModal, createTaskModal: true})}}><FaPlus /> Crear tarea</button>
                            <TaskModal activeModal= {taskModal} setTaskModal={setTaskModal} tarea={tareaActiva!}></TaskModal>
                        </div>
                    </div>
                    <div className={styles.task_list}>
                        {backlog.map((tarea) => (
                            <div className={styles.task_card} key={tarea.id}>
                                <div className={styles.task_content}>
                                    <p><b>{tarea.titulo}</b>: {tarea.descripcion}</p>
                                </div>
                                <div className={styles.task_actions}>
                                    <button className={styles.btn_move}><FaArrowRight /> Enviar a</button>
                                    <select className={styles.sprint_select}>
                                        <option>Seleccione una sprint</option>
                                        {sprints.map(sprint => (
                                            <option key={sprint.id} value={sprint.id}>{sprint.nombre}</option>
                                        ))}
                                    </select>
                                    <div className={styles.task_actions_btn}>
                                        <button className={styles.btn_view} onClick={()=>{setTaskModal({...taskModal, viewTaskModal: true}); setTareaActiva(tarea)}}><FaEye /></button>
                                        <button className={styles.btn_edit} onClick={()=>{setTaskModal({...taskModal, editTaskModal: true}); setTareaActiva(tarea)}}><FaEdit /></button>
                                        <button className={styles.btn_delete} onClick={()=>{deleteTask(tarea.id)}}><FaTrash /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BacklogMain
