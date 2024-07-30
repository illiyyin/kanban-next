import { selector } from 'recoil'
import { tasksState } from './taskAtoms'
import type { Task } from '@/types'
import { SelectorKeys } from '@/constants'

export const uncompletedTasksSelector = selector<Task[]>({
  key: 'uncompleted_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder !== 4
    })
  },
})

export const notStartedTasksSelector = selector<Task[]>({
  key: SelectorKeys.NOT_STARTED_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 1
    })
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  key: SelectorKeys.IN_PROGRESS_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 2
    })
  },
})

export const waitingTasksSelector = selector<Task[]>({
  key: SelectorKeys.WAITING_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 3
    })
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: 'completed_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 4
    })
  },
})
