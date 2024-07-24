import React, { useState } from 'react'
import type { Task, CSSProperties } from '@/types'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'
import { useTasksAction } from '@/hooks/useTasksAction'
import TaskMenu from '../TaskMenu'
import TaskModal from '../TaskModal'

interface TaskCardProps {
  task: Task
}

const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
  const justifyContentValue: 'flex-end' | 'space-between' =
    progressOrder === TASK_PROGRESS_ID.NOT_STARTED ? 'flex-end' : 'space-between'
  return {
    display: 'flex',
    justifyContent: justifyContentValue,
  }
}

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5'

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer'

  return {
    color,
    cursor,
    fontSize: '28px',
  }
}

const TaskCard = ({ task }: TaskCardProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { completeTask, moveTaskCard,deleteTask } = useTasksAction()

  return (
    <div style={styles.taskCard}>
      <div style={styles.taskIcons}>
        <div className="material-icons" style={getIconStyle(task.progressOrder)} onClick={(): void => {
          completeTask(task.id) // Ditambahkan
        }}>check_circle</div>
        <div className="material-icons" style={styles.menuIcon} onClick={(): void => {
          setIsMenuOpen(true) // Ditambahkan
        }}>
          more_vert
        </div>
      </div>
      <p style={styles.taskTitle}>{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div style={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button className="material-icons" onClick={(): void => {
            moveTaskCard(task.id, -1) // Ditambahkan
          }}>chevron_left</button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button className="material-icons" onClick={(): void => {
            moveTaskCard(task.id, 1) // Ditambahkan
          }}>chevron_right</button>
        )}
      </div>
      {isMenuOpen && <TaskMenu setIsMenuOpen={setIsMenuOpen} setIsModalOpen={setIsModalOpen} deleteTask={() => {
        deleteTask(task.id)
        setIsMenuOpen(false)
      }} />}
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

const styles: CSSProperties = {
  taskCard: {
    backgroundColor: '#C7EFD0',
    borderRadius: '12px',
    padding: '24px',
    margin: '12px 0',
    fontSize: '20px',
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  taskIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  taskTitle: {
    fontSize: '30px',
  },
  arrowsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default TaskCard