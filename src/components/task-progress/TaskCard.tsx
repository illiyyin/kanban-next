import React, { useState } from 'react'
import type { Task } from '@/types'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'
import { useTasksAction } from '@/hooks/useTasksAction'
import TaskMenu from '../TaskMenu'
import TaskModal from '../TaskModal'

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { completeTask, moveTaskCard, deleteTask } = useTasksAction()

  const isStarted = task.progressOrder === TASK_PROGRESS_ID.NOT_STARTED

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
    <div className="bg-green-200 p-6 rounded-xl my-2 flex flex-col gap-y-2 text-xl">
      <div className="flex justify-between">
        <IconStyle />
        <div
          className="material-icons cursor-pointer"
          onClick={(): void => {
            setIsMenuOpen(true) // Ditambahkan
          }}
        >
          more_vert
        </div>
      </div>
      <p className="text-3xl font-medium mt-2">{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div className={`flex ${isStarted ? 'justify-end' : 'justify-between'}`}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button
            className="material-icons"
            onClick={(): void => {
              moveTaskCard(task.id, -1) // Ditambahkan
            }}
          >
            chevron_left
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button
            className="material-icons"
            onClick={(): void => {
              moveTaskCard(task.id, 1) // Ditambahkan
            }}
          >
            chevron_right
          </button>
        )}
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

export default TaskCard
