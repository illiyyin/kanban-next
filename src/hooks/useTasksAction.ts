import { useRecoilState } from 'recoil'
import type { Task } from '@/types'
import { activeFilterState, tasksState } from '@/features/taskAtoms'
import { TASK_PROGRESS_ID } from '@/constants'

interface useTaskActionType {
  completeTask: (taskId: number) => void
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void
  addTask: (title: string, detail: string, dueDate: string, progressOrder: number) => void
  editTask: (
    id: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void
  deleteTask: (id: number) => void
  changeFilter: (id: number) => void
  resetFilter: () => void
  tasks: Task[]
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState)
  const [activeFilter, setActiveFilter] = useRecoilState<number | null>(activeFilterState)

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task,
    )
    setTasks(updatedTasks)
  }

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: task.progressOrder + directionNumber } : task,
    )
    setTasks(updatedTasks)
  }

  const addTask = (title: string, detail: string, dueDate: string, progressOrder: number): void => {
    const newTask: Task = {
      id: (tasks[tasks.length - 1].id || 0) + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const editTask = (
    id: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              detail,
              dueDate,
              progressOrder,
            }
          : task,
      ),
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const changeFilter = (statusNumber: number) => {
    setActiveFilter(statusNumber)
  }
  const resetFilter = () => {
    setActiveFilter(null)
  }

  return {
    completeTask,
    moveTaskCard,
    addTask,
    editTask,
    deleteTask,
    tasks: tasks.filter((item) => (activeFilter ? activeFilter === item.progressOrder : true)),
    changeFilter,
    resetFilter,
  }
}
