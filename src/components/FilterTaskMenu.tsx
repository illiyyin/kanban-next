import { MODAL_TYPE, TASK_PROGRESS_ID, TASK_PROGRESS_STATUS } from '@/constants'
import { useMenu } from '@/hooks/useMenu'
import { useTasksAction } from '@/hooks/useTasksAction'
import type { Dispatch, SetStateAction } from 'react'

const FilterTaskMenu = (): JSX.Element => {
  const { changeFilter, resetFilter } = useTasksAction()
  const { close } = useMenu({ key: MODAL_TYPE.FILTER })

  const handleChangeFilter = (id: number) => {
    changeFilter(id)
    close()
  }
  return (
    <div className="absolute flex flex-col bg-white right-4 top-4 py-2 px-4 border border-gray-500 gap-y-2">
      <div
        className="flex items-center cursor-pointer gap-x-1 text-black"
        onClick={() => handleChangeFilter(TASK_PROGRESS_ID.COMPLETED)}
      >
        {TASK_PROGRESS_STATUS.COMPLETED}
      </div>
      <div
        className="flex items-center cursor-pointer gap-x-1 text-black"
        onClick={() => handleChangeFilter(TASK_PROGRESS_ID.IN_PROGRESS)}
      >
        {TASK_PROGRESS_STATUS.IN_PROGRESS}
      </div>
      <div className="flex items-center cursor-pointer gap-x-1 text-black" onClick={resetFilter}>
        {TASK_PROGRESS_STATUS.ALL}
      </div>
      <span className="material-icons absolute top-1 right-1 cursor-pointer" onClick={close}>
        close
      </span>
    </div>
  )
}

export default FilterTaskMenu
