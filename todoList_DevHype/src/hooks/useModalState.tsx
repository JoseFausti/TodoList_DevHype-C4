import { useState } from 'react'

const useModalState = () => {

    const [taskModal, setTaskModal] = useState<Record<string, boolean>>(
        {
            createTaskModal: false,
            viewTaskModal: false,
            editTaskModal: false,
        }
    )

    return (
        {
            taskModal, setTaskModal
        }
    )
}

export default useModalState
