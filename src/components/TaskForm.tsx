import React, { useState } from 'react'
import { MODAL_TYPE, TASK_MODAL_TYPE, TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '@/constants'
import type { Task } from '@/types'
import { useTasksAction } from '@/hooks/useTasksAction'
import { useMenu } from '@/hooks/useMenu'

interface TaskFormProps {
  defaultProgressOrder: number
  type: string
  task: Task
}

const TaskForm = ({ defaultProgressOrder, type, task }: TaskFormProps): JSX.Element => {
  const [title, setTitle] = useState<string>(task?.title || '')
  const [detail, setDetail] = useState<string>(task?.detail || '')
  const [dueDate, setDueDate] = useState<string>(task?.dueDate || '')
  const [progressOrder, setProgressOrder] = useState<number>(
    task?.progressOrder || defaultProgressOrder,
  )

  const { addTask, editTask } = useTasksAction()
  const { close } = useMenu({
    key: type === TASK_MODAL_TYPE.ADD ? MODAL_TYPE.MODAL_ADD : MODAL_TYPE.MODAL_EDIT,
  })

  const handleSubmit = (): void => {
    if (type === TASK_MODAL_TYPE.ADD) {
      // Jalankan function addTask di sini
      addTask(title, detail, dueDate, progressOrder)
    }
    if (type === TASK_MODAL_TYPE.EDIT) {
      editTask(task.id, title, detail, dueDate, progressOrder)
    }
    close()
  }

  return (
    <form className="text-2xl flex flex-col gap-y-4 w-full">
      <div className="flex flex-col">
        <label>Title :</label>
        <input
          type="text"
          value={title}
          onChange={(e): void => {
            setTitle(e.target.value)
          }}
          data-testid="input-title"
          className="border border-gray-500 h-10 text-xl"
        />
      </div>
      <div className="flex flex-col">
        <label>Detail :</label>
        <textarea
          value={detail}
          onChange={(e): void => {
            setDetail(e.target.value)
          }}
          data-testid="input-detail"
          className="border border-gray-500 h-20 text-xl"
        />
      </div>
      <div className="flex flex-col">
        <label>Due Date :</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e): void => {
            setDueDate(e.target.value)
          }}
          data-testid="input-dueDate"
          className="border border-gray-500 h-10 text-xl"
        />
      </div>
      <div className="flex flex-col">
        <label>Progress :</label>
        <select
          className="border border-gray-500 h-10 text-xl"
          defaultValue={progressOrder}
          onChange={(e): void => {
            setProgressOrder(Number(e.target.value))
          }}
          data-testid="input-progressOrder"
        >
          <option value={TASK_PROGRESS_ID.NOT_STARTED}>{TASK_PROGRESS_STATUS.NOT_STARTED}</option>
          <option value={TASK_PROGRESS_ID.IN_PROGRESS}>{TASK_PROGRESS_STATUS.IN_PROGRESS}</option>
          <option value={TASK_PROGRESS_ID.WAITING}>{TASK_PROGRESS_STATUS.WAITING}</option>
          <option value={TASK_PROGRESS_ID.COMPLETED}>{TASK_PROGRESS_STATUS.COMPLETED}</option>
        </select>
      </div>
      <button
        type="button"
        className="self-start bg-green-500 text-white text-xl py-3 px-6 rounded"
        onClick={(): void => {
          handleSubmit() // Ditambahkan
        }}
        data-testid="submit-modal-button"
      >
        Submit
      </button>
    </form>
  )
}

export default TaskForm
