import useTaskFunctions from "../../hooks/useTaskFunctions";
import { TaskModalProps } from "../../types/types"
import CreateTask from "../screens/tasks/CreateTask";
import ViewTask from "../screens/tasks/ViewTask";

const TaskModal: React.FC<TaskModalProps> = ({activeModal, setTaskModal, tarea}) => {
   
    const {createTask} = useTaskFunctions();

  return (
    <>
      {activeModal.createTaskModal && <CreateTask createTask={createTask} setModal={setTaskModal}/>}
      {activeModal.viewTaskModal && <ViewTask task={tarea!} setModal={setTaskModal}/>}
    </>
  )
}

export default TaskModal
