import { useState } from 'react'
import { ITarea } from '../types/types';

const useModalState = () => {

    const [taskModal, setTaskModal] = useState<Record<string, boolean>>(
        {
            createTaskModal: false,
            viewTaskModal: false,
            editTaskModal: false,
        }
    )

    const [task, setTask] = useState<ITarea | undefined>(undefined);

    return (
        {
            taskModal, setTaskModal,
            task, setTask
        }
    )
}

export default useModalState
