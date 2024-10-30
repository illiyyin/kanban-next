import { fireEvent, render, screen } from '@testing-library/react';
import SideMenu from '../SideMenu';

import mockRouter from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('SideMenu', () => {
  beforeEach(() => {
    render(
      <SideMenu />,
      { wrapper: MemoryRouterProvider }
    );
  })

  it('renders menu Home and redirect to the Home Page', () => {
    const menuLink = screen.getByText("Home")
    expect(menuLink).toBeInTheDocument()

    fireEvent.click(menuLink);
    expect(mockRouter.asPath).toEqual('/')
  })

  it('renders menu Task List and redirect to the Task List Page ', () => {
    const menuLink = screen.getByText("Task List")
    expect(menuLink).toBeInTheDocument()

    fireEvent.click(menuLink);
    expect(mockRouter.asPath).toEqual('/task-list')
  })

  it('renders menu Task Progress and redirect to the Task Progress Page', () => {
    const menuLink = screen.getByText("Task Progress")
    expect(menuLink).toBeInTheDocument()

    fireEvent.click(menuLink);
    expect(mockRouter.asPath).toEqual('/task-progress')
  })
});