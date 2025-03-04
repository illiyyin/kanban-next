export const TASK_PROGRESS_STATUS = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  WAITING: 'Waiting/In Review',
  COMPLETED: 'Completed',
  ALL: 'All Task',
}

export const TASK_PROGRESS_ID = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  WAITING: 3,
  COMPLETED: 4,
}

export const AtomKeys = {
  TASKS: 'tasks',
  MENU: 'menu',
  TASK: 'task',
}

export const SelectorKeys = {
  UNCOMPLETED_TASKS: 'uncompletedTasks',
  NOT_STARTED_TASKS: 'notStartedTasks',
  IN_PROGRESS_TASKS: 'inProgressTasks',
  WAITING_TASKS: 'waitingTasks',
  COMPLETED_TASKS: 'completedTasks',
}

export const TASK_MODAL_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
}

export const MODAL_TYPE = {
  FILTER: 'filter',
  MENU: 'menu',
  MODAL_ADD: 'modal_add',
  MODAL_EDIT: 'modal_edit',
}
