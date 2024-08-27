import { fireEvent, render, screen, } from '@testing-library/react';
import TaskList from '../TaskList';
import { RecoilRoot } from 'recoil';
import { tasksState } from '@/features/taskAtoms';
import { activeMenuState } from '@/features/menuAtoms';

const tasks = [
  {
    id: 1,
    title: 'Test Task 1',
    detail: 'aaaaa',
    dueDate: '2023-05-05',
    progressOrder: 1,
  },
  {
    id: 2,
    title: 'Test Task 2',
    detail: 'bbbbb',
    dueDate: '2025-01-01',
    progressOrder: 1,
  },
]


// handle mock global modal
const modal = {
  isOpen: false,
  key: null,
  activeTask: null
}

describe('Task List Page', () => {
  beforeEach(() => {
    render(
      <RecoilRoot initializeState={({ set }) => {
        set(tasksState, tasks)
        set(activeMenuState, modal)
      }}>
        <TaskList />
      </RecoilRoot>
    )
  })
  it('Show task list', () => {
    const taskLength = screen.getAllByTestId('task-list-item').length
    expect(taskLength).toEqual(2)
  })

  it('Show add modal', () => {
    const addModalButton = screen.getByTestId('add-modal-button')
    fireEvent.click(addModalButton);

    const modalText = screen.getByText('Add your task')
    expect(modalText).toBeInTheDocument()
  })

  it('Success add task', () => {
    const taskLengthBefore = screen.getAllByTestId('task-list-item').length

    const addModalButton = screen.getByTestId('add-modal-button')
    fireEvent.click(addModalButton);

    const newTask = {
      title: "Test Task 3",
      detail: 'ccccc',
      dueDate: '2027-12-12',
      progressOrder: 3,
    }

    // input title
    const inputTitle: HTMLInputElement = screen.getByTestId('input-title')
    fireEvent.change(inputTitle, { target: { value: newTask.title } })
    expect(inputTitle.value).toBe(newTask.title)

    // input detail
    const inputDetail: HTMLInputElement = screen.getByTestId('input-detail')
    fireEvent.change(inputDetail, { target: { value: newTask.detail } })
    expect(inputDetail.value).toBe(newTask.detail)

    // input dueDate
    const inputDueDate: HTMLInputElement = screen.getByTestId('input-dueDate')
    fireEvent.change(inputDueDate, { target: { value: newTask.dueDate } })
    expect(inputDueDate.value).toBe(newTask.dueDate)

    // input progressOrder
    const inputProgressOrder: HTMLInputElement = screen.getByTestId('input-progressOrder')
    fireEvent.change(inputProgressOrder, { target: { value: newTask.progressOrder } })
    expect(Number(inputProgressOrder.value)).toBe(newTask.progressOrder)
    
    // submit button
    const submitButton = screen.getByTestId('submit-modal-button')
    fireEvent.click(submitButton)

    const taskLengthAfter = screen.getAllByTestId('task-list-item').length
    expect(taskLengthAfter).toBeGreaterThan(taskLengthBefore)
  })

})