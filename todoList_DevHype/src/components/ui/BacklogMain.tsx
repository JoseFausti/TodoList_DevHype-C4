import styles from '../screens/BacklogScreen.module.css'
import useModalState from '../../hooks/useModalState';
import useStore from '../../hooks/useStore';
import useTaskFunctions from '../../hooks/useTaskFunctions';
import CreateTask from '../screens/tasks/CreateTask';
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowRight } from "react-icons/fa";

export const BacklogMain = () => {

    const {backlog, sprints} = useStore();
    const {taskModal, setTaskModal} = useModalState();
    const {createTask} = useTaskFunctions();

    return (
        <>
            <main className={styles.backlog_main}>
                <div className={styles.backlog_main_container}>
                    <div className={styles.backlog_main_header}>
                        <h1>Backlog</h1>
                        <div>
                            <h2>Tareas en el backlog</h2>
                            <button className={styles.btn_add_task} onClick={()=>{setTaskModal({...taskModal, createTaskModal: true})}}><FaPlus /> Crear tarea</button>
                            {taskModal.createTaskModal && <CreateTask createTask={createTask} setModal={setTaskModal}/>}
                        </div>
                    </div>
                    <div className={styles.task_list}>
                        {backlog.map((tarea) => (
                            <div className={styles.task_card} key={tarea.id}>
                                <div>
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
                                        <button className={styles.btn_view}><FaEye /></button>
                                        <button className={styles.btn_edit}><FaEdit /></button>
                                        <button className={styles.btn_delete}><FaTrash /></button>
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
