"use client"
import { tasksState } from '@/features/taskAtoms'
import type { CSSProperties, Task } from '@/types'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import TaskListItem from './TaskListItem'
import TaskModal from '../TaskModal'
import { TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'

const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button style={styles.button} onClick={(): void => {
          setIsModalOpen(true) // Ditambahkan
        }}>
          <span className="material-icons" >add</span>Add task
        </button>
        <button style={styles.button}>
          <span className="material-icons">sort</span>Filter tasks
        </button>
      </div>
      <div>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderTaskName}>Task Name</div>
          <div style={styles.tableHeaderDetail}>Detail</div>
          <div style={styles.tableHeaderDueDate}>Due Date</div>
          <div style={styles.tableHeaderProgress}>Progress</div>
        </div>
        {tasks.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
          type={TASK_MODAL_TYPE.ADD}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '20px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  taskButtons: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    marginRight: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#55ACC8',
    color: 'white'
  },
  tableHead: {
    display: 'flex',
    fontSize: '24px',
    borderBottom: '1px solid #D8D8D8',
  },
  tableHeaderTaskName: {
    padding: '16px',
    width: '25%',
  },
  tableHeaderDetail: {
    padding: '16px',
    width: '30%',
  },
  tableHeaderDueDate: {
    padding: '16px',
    width: '20%',
  },
  tableHeaderProgress: {
    padding: '16px',
    width: '15%',
  },
}

export default TaskList