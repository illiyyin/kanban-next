import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Task } from '@/types'
import TaskForm from './TaskForm'
import { useMenu } from '@/hooks/useMenu'
import { MODAL_TYPE, TASK_MODAL_TYPE } from '@/constants'

type TaskModalProps = {
  headingTitle: string
  defaultProgressOrder?: number
  type: string
  task?: Task
}

const TaskModal = ({
  headingTitle,
  defaultProgressOrder,
  type,
  task,
}: TaskModalProps): JSX.Element => {
  const { close } = useMenu({
    key: TASK_MODAL_TYPE.ADD === 'type' ? MODAL_TYPE.MODAL_ADD : MODAL_TYPE.MODAL_EDIT,
  })
  return (
    <div className="fixed top-1/4 left-[40%] p-8 border border-gray-500 w-1/4 z-10 bg-white flex flex-col">
      <div className="flex justify-between mb-4 w-full">
        <h1 className="font-bold text-2xl">{headingTitle}</h1>
        <span className="material-icons cursor-pointer" onClick={close}>
          close
        </span>
      </div>
      <TaskForm task={task!} type={type} defaultProgressOrder={defaultProgressOrder as number} />
    </div>
  )
}

export default TaskModal
