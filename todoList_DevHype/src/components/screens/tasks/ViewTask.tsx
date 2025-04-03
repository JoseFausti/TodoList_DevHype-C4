import styles from "./ViewTask.module.css"
import { ViewTaskProps } from "../../../types/types"

const ViewTask: React.FC<ViewTaskProps> = ({task, setModal}) => {
  return (
    <div className={styles.viewTask_modal_container}>
        <button className={styles.btn_close} onClick={() => setModal({viewTaskModal: false})}>X</button>
        <div className={styles.viewTask_form_container}>
            <form className={styles.viewTask_form}>
                <div>
                  <label htmlFor="title">Título</label>
                  <input type="text" name="title" value={task.titulo}/>
                </div>
                <div>
                  <label htmlFor="description">Descripción</label>
                  <input type="text" name="description" value={task.descripcion}/>
                </div>
                <div>
                  <label htmlFor="date">Fecha límite</label>
                  <input type="text" name="date" value={task.fechaLimite}></input>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ViewTask
