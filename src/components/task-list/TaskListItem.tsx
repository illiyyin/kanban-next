import { MODAL_TYPE, TASK_MODAL_TYPE, TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '@/constants'
import { useTasksAction } from '@/hooks/useTasksAction'
import type { Task } from '@/types'
import React, { useState } from 'react'
import TaskMenu from '../TaskMenu'
import TaskModal from '../TaskModal'
import TaskIcon from '@/components/TaskIcon'
import { useMenu } from '@/hooks/useMenu'

interface TaskListItemProps {
  task: Task
}

const getProgressCategory = (progressOrder: number): string => {
  switch (progressOrder) {
    case TASK_PROGRESS_ID.NOT_STARTED:
      return TASK_PROGRESS_STATUS.NOT_STARTED
    case TASK_PROGRESS_ID.IN_PROGRESS:
      return TASK_PROGRESS_STATUS.IN_PROGRESS
    case TASK_PROGRESS_ID.WAITING:
      return TASK_PROGRESS_STATUS.WAITING
    case TASK_PROGRESS_ID.COMPLETED:
      return TASK_PROGRESS_STATUS.COMPLETED
    default:
      return TASK_PROGRESS_STATUS.NOT_STARTED
  }
}

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  const { deleteTask } = useTasksAction()
  const { isMenuOpen: isMenuOpen, open } = useMenu({ key: MODAL_TYPE.MENU, taskId: task.id })
  const { isMenuOpen: isEditMenuOpen } = useMenu({
    key: MODAL_TYPE.MODAL_EDIT,
    taskId: task.id,
  })
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // console.log(isEditMenuOpen, task.id)

  return (
    <div className="flex items-stretch border-b border-b-gray-300 text-xl relative ">
      <div className="w-1/4 border-r p-4 flex items-center  border-r-gray-300">
        <TaskIcon task={task} />
        {task.title}
      </div>
      <div className="w-[30%] border-r p-4 flex items-center  border-r-gray-300">{task.detail}</div>
      <div className="w-1/5 border-r p-4 flex items-center  border-r-gray-300">{task.dueDate}</div>
      {/* Ditambahkan */}
      <div className="w-[15%] border-r-0 p-4 flex items-center  border-r-gray-300">
        {getProgressCategory(task.progressOrder)}
      </div>
      <div className="relative flex items-center">
        <span className="material-icons cursor-pointer" onClick={open}>
          more_horiz
        </span>
        {isMenuOpen && <TaskMenu taskId={task.id} />}
      </div>
      {isEditMenuOpen && (
        <TaskModal headingTitle="Edit your task" task={task} type={TASK_MODAL_TYPE.EDIT} />
      )}
    </div>
  )
}

export default TaskListItem
