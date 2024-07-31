import { TASK_MODAL_TYPE, TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '@/constants'
import { useTasksAction } from '@/hooks/useTasksAction'
import type { Task } from '@/types'
import React, { useState } from 'react'
import TaskMenu from '../TaskMenu'
import TaskModal from '../TaskModal'

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
  const { completeTask, deleteTask } = useTasksAction()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const IconStyle = () => {
    const isProgressCompleted = task.progressOrder === TASK_PROGRESS_ID.COMPLETED

    return (
      <span
        className={`material-icons mr-4 text-3xl ${isProgressCompleted ? 'text-green-500 cursor-default' : 'text-gray-400 cursor-pointer'}`}
        onClick={(): void => {
          completeTask(task.id) // Ditambahkan
        }}
      >
        check_circle
      </span>
    )
  }

  return (
    <div className="flex items-stretch border-b border-b-gray-300 text-xl relative *:p-4 *:flex *:items-center  *:border-r-gray-300">
      <div className="w-1/4 border-r">
        <IconStyle />
        {task.title}
      </div>
      <div className="w-[30%] border-r">{task.detail}</div>
      <div className="w-1/5 border-r">{task.dueDate}</div>
      {/* Ditambahkan */}
      <div className="w-[15%] border-r-0">{getProgressCategory(task.progressOrder)}</div>
      <div>
        <span
          className="material-icons"
          onClick={(): void => {
            setIsMenuOpen(true) // Ditambahkan
          }}
        >
          more_horiz
        </span>
      </div>
      {isMenuOpen && (
        <TaskMenu
          setIsMenuOpen={setIsMenuOpen}
          setIsModalOpen={setIsModalOpen}
          deleteTask={() => {
            deleteTask(task.id)
            setIsMenuOpen(false)
          }}
        />
      )}
      {isModalOpen && (
        <TaskModal
          headingTitle="Edit your task"
          setIsModalOpen={setIsModalOpen}
          task={task}
          type={TASK_MODAL_TYPE.EDIT}
        />
      )}
    </div>
  )
}

export default TaskListItem
