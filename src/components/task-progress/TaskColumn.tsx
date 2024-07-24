import React, { useState } from 'react'
import TaskCard from './TaskCard'
import type { Task, CSSProperties } from '@/types'
import TaskModal from '../TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'

interface TaskColumnProps {
  columnTitle: string
  columnId: number
  tasks: Task[]
}

const TaskColumn = ({ columnTitle, tasks, columnId }: TaskColumnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
        <div
          className="material-icons"
          style={styles.plusIcon}
          onClick={(): void => {
            setIsModalOpen(true) // Ditambahkan
          }}
        >
          add
        </div>
      </div>
      <div>
        {tasks.map((task: Task) => {
          return <TaskCard key={task.id} task={task} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={columnId}
          type={TASK_MODAL_TYPE.ADD}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  plusIcon: {
    cursor: 'pointer',
  },
  categoryColumn: {
    width: '22%',
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
  },
}

export default TaskColumn
