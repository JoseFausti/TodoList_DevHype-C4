import { TaskModalProps } from "../../types/types"
import CreateTask from "../screens/tasks/CreateTask";
import EditTask from "../screens/tasks/EditTask";
import ViewTask from "../screens/tasks/ViewTask";

const TaskModal: React.FC<TaskModalProps> = ({activeModal, setTaskModal, tarea}) => {
   
  return (
    <>
      {activeModal.createTaskModal && <CreateTask setModal={setTaskModal}/>}
      {activeModal.viewTaskModal && <ViewTask task={tarea!} setModal={setTaskModal}/>}
      {activeModal.editTaskModal && <EditTask task={tarea!} setModal={setTaskModal}/>}
    </>
  )
}

export default TaskModal
