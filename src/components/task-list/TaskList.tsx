'use client'
import { tasksState } from '@/features/taskAtoms'
import type { Task } from '@/types'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import TaskListItem from './TaskListItem'
import TaskModal from '../TaskModal'
import { MODAL_TYPE, TASK_MODAL_TYPE, TASK_PROGRESS_ID } from '@/constants'
import { useTasksAction } from '@/hooks/useTasksAction'
import FilterTaskMenu from '../FilterTaskMenu'
import { useMenu } from '@/hooks/useMenu'

const TaskList = (): JSX.Element => {
  const { tasks } = useTasksAction()
  const { isMenuOpen: isFilterMenuOpen, open: openFilter } = useMenu({ key: MODAL_TYPE.FILTER })
  const { isMenuOpen: isAddModalOpen, open: openAddModal } = useMenu({ key: MODAL_TYPE.MODAL_ADD })

  return (
    <div className="w-full p-10">
      <h1 className="text-green-500 mb-16 font-bold text-3xl">Your Tasks</h1>
      <div className="flex mb-8 gap-x-4">
        <button
          className="p-4 flex items-center bg-cyan-500 text-white gap-x-2 relative"
          onClick={openAddModal}
        >
          <span className="material-icons">add</span>Add task
        </button>
        <button
          className="p-4 flex items-center bg-cyan-500 text-white gap-x-2 relative"
          onClick={openFilter}
        >
          <span className="material-icons">sort</span>Filter tasks
          {isFilterMenuOpen && <FilterTaskMenu />}
        </button>
      </div>
      <div>
        <div className="flex text-2xl border-b border-b-gray-300 *:p-4">
          <div className="w-1/4">Task Name</div>
          <div className="w-[30%]">Detail</div>
          <div className="w-1/5">Due Date</div>
          <div className="w-[15%]">Progress</div>
        </div>
        {tasks.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
      </div>
      {isAddModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
          type={TASK_MODAL_TYPE.ADD}
        />
      )}
    </div>
  )
}

export default TaskList
