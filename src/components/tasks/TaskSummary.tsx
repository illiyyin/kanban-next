'use client'
import { useRecoilValue } from 'recoil'
import type { Task, CSSProperties } from '@/types'
import { completedTasksSelector, uncompletedTasksSelector } from '@/features/taskSelector'
import Link from 'next/link'

const TaskSummary = (): JSX.Element => {
  const completedTasks = useRecoilValue<Task[]>(completedTasksSelector)

  const uncompletedTasks = useRecoilValue<Task[]>(uncompletedTasksSelector)

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Summary of Your Tasks</h1>
      {/* Diperbarui */}
      <div style={styles.list}>
        <span className="material-icons">check_circle</span>
        <h2>
          You have completed {completedTasks.length} {completedTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div style={styles.list}>
        <span className="material-icons">list</span>
        <h2>
          You still have {uncompletedTasks.length} {uncompletedTasks.length <= 1 ? 'task' : 'tasks'}{' '}
          left
        </h2>
      </div>
      <div style={styles.links}>
        <Link href="/task-list" style={styles.link}>
          See Your Task List
        </Link>
        <Link href="/progress-management" style={styles.link}>
          Manage Your Task Progress
        </Link>
      </div>
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '40px',
    width: '100%',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
    fontSize: '32px',
    fontWeight: 700,
  },
  list: {
    color: '#fff',
    backgroundColor: '#55C89F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '20px',
    width: '100%',
    columnGap: '8px',
  },
  links: {
    display: 'flex',
  },
  link: {
    padding: '16px',
    marginRight: '24px',
    backgroundColor: '#55ACC8',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
  },
}

export default TaskSummary
