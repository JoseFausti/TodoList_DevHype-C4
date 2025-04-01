import styles from './BacklogScreen.module.css'
import { FaEye, FaEdit, FaTrash, FaPlus, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { backlogStore } from "../../store/backlogStore";
import { sprintStore } from "../../store/sprintStore";
import { useEffect } from 'react';
import { getSprintListController } from '../../data/sprintListController';
import { getBacklogController } from '../../data/backlogController';

const BacklogScreen = () => {

    // Estado del Backlog
    const {
        backlog, 
        tareaActiva, 
        setTarea, 
        setTareaActiva
    } 
    = backlogStore(useShallow((state) => ({
        backlog: state.tareas,
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

    // Sincronizamos los sprints del estado con los de la bd
    useEffect(()=>{
        (async ()=>{
            const sprintsData = await getSprintListController()
            const backlogData = await getBacklogController();
            try {
                if (sprintsData && backlogData){
                    setSprint(sprintsData)
                    setTarea(backlogData)
                } else{
                    throw new Error('Error en las peticiones a los controladores.')
                }
            } catch (error) {
                console.log('Ocurrio un error al cargar los datos en BacklogScreen: ', error);
            }
        })();        
    },[])

    return (
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
            
            {/* Backlog */}
            <main className={styles.backlog_main}>
                <div className={styles.backlog_main_container}>
                    <div className={styles.backlog_main_header}>
                        <h1>Backlog</h1>
                        <div>
                            <h2>Tareas en el backlog</h2>
                            <button className={styles.btn_add_task}><FaPlus /> Crear tarea</button>
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
        </div>
    );
};

export default BacklogScreen;

