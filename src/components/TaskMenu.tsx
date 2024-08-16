import { MODAL_TYPE, TASK_MODAL_TYPE } from '@/constants'
import { useMenu } from '@/hooks/useMenu'
import { useTasksAction } from '@/hooks/useTasksAction'
import type { Dispatch, SetStateAction } from 'react'

interface TaskMenuProps {
  taskId: number
}

const TaskMenu = ({ taskId }: TaskMenuProps): JSX.Element => {
  const { deleteTask } = useTasksAction()
  const { open, close } = useMenu({ key: MODAL_TYPE.MODAL_EDIT, taskId })
  return (
    <div className="absolute flex flex-col bg-white right-4 top-4 py-2 px-4 border border-gray-500 gap-y-2">
      <div
        className="flex items-center cursor-pointer gap-x-1"
        onClick={open}
      >
        <span className="material-icons">edit</span>Edit
      </div>
      <div className="flex items-center cursor-pointer gap-x-1" onClick={() => {
        deleteTask(taskId)
        close()
      }}>
        <span className="material-icons">delete</span>Delete
      </div>
      <span className="material-icons absolute top-1 right-1 cursor-pointer" onClick={close}>
        close
      </span>
    </div>
  )
}

export default TaskMenu
