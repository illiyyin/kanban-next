'use client'
import {
  completedTasksSelector,
  inProgressTasksSelector,
  notStartedTasksSelector,
  waitingTasksSelector,
} from '@/features/taskSelector'
import type { CSSProperties, Task } from '@/types'
import React from 'react'
import { useRecoilValue } from 'recoil'
import TaskColumn from './TaskColumn'
import { TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '@/constants'

const TaskProgress = (): JSX.Element => {
  const notStartedTasks: Task[] = useRecoilValue(notStartedTasksSelector)

  const inProgressTasks: Task[] = useRecoilValue(inProgressTasksSelector)

  const waitingTasks: Task[] = useRecoilValue(waitingTasksSelector)

  const completedTasks: Task[] = useRecoilValue(completedTasksSelector)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Progress</h1>
      <div style={styles.taskCategories}>
        <TaskColumn
          columnId={TASK_PROGRESS_ID.NOT_STARTED}
          columnTitle={TASK_PROGRESS_STATUS.NOT_STARTED}
          tasks={notStartedTasks}
        />
        <TaskColumn
          columnId={TASK_PROGRESS_ID.IN_PROGRESS}
          columnTitle={TASK_PROGRESS_STATUS.IN_PROGRESS}
          tasks={inProgressTasks}
        />
        <TaskColumn
          columnId={TASK_PROGRESS_ID.WAITING}
          columnTitle={TASK_PROGRESS_STATUS.WAITING}
          tasks={waitingTasks}
        />
        <TaskColumn
          columnId={TASK_PROGRESS_ID.COMPLETED}
          columnTitle={TASK_PROGRESS_STATUS.COMPLETED}
          tasks={completedTasks}
        />
      </div>
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
  taskCategories: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}

export default TaskProgress
