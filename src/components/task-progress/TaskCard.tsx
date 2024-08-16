import React, { useState } from 'react'
import type { Task } from '@/types'
import { MODAL_TYPE, TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'
import { useTasksAction } from '@/hooks/useTasksAction'
import TaskMenu from '../TaskMenu'
import TaskModal from '../TaskModal'
import TaskIcon from '@/components/TaskIcon'
import { useMenu } from '@/hooks/useMenu'

interface TaskCardProps {
  task: Task
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const { isMenuOpen: isMenuOpen, open } = useMenu({ key: MODAL_TYPE.MENU, taskId: task.id })
  const { isMenuOpen: isEditMenuOpen } = useMenu({
    key: MODAL_TYPE.MODAL_EDIT,
    taskId: task.id,
  })
  const { moveTaskCard, deleteTask } = useTasksAction()

  const isStarted = task.progressOrder === TASK_PROGRESS_ID.NOT_STARTED

  return (
    <div className="bg-green-200 p-6 rounded-xl my-2 flex flex-col gap-y-2 text-xl relative">
      <div className="flex justify-between">
        <TaskIcon task={task} />
        {/* <div className="material-icons">check_circle</div> */}
        <div
          className="material-icons cursor-pointer"
          onClick={open}
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
          taskId={task.id}
        />
      )}
      {isEditMenuOpen && (
        <TaskModal
          headingTitle="Edit your task"
          task={task}
          type={TASK_MODAL_TYPE.EDIT}
        />
      )}
    </div>
  )
}

export default TaskCard
