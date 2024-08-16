export interface CSSProperties {
  [key: string]: React.CSSProperties
}

export interface Task {
  id: number
  title: string
  detail: string
  dueDate: string
  progressOrder: number
}

export interface ActiveMenu {
  isOpen: boolean
  key: null | string
  activeTask: null | number
}
