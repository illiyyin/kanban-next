import { render, screen } from '@testing-library/react';
import TaskList from '../TaskList';
import { RecoilRoot } from 'recoil';
import { tasksState } from '@/features/taskAtoms';

const tasks = [
  {
    id: 1,
    title: 'Test Task 1',
    detail: 'aaaaa',
    dueDate: '05-05-2023',
    progressOrder: 0,
  },
  {
    id: 2,
    title: 'Test Task 2',
    detail: 'bbbbb',
    dueDate: '01-01-2025',
    progressOrder: 0,
  },
]

describe('Task List Page', () => {
  beforeEach(() => {
    render(
      <RecoilRoot initializeState={({ set }) => set(tasksState, tasks)}>
        <TaskList />
      </RecoilRoot>
    )
  })
  it('Show task list', () => {
    const taskLength = screen.getAllByTestId('task-list-item').length
    expect(taskLength).toEqual(2)
  })
})