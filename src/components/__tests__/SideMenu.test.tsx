import { render, screen } from '@testing-library/react';
import SideMenu from '../SideMenu';

describe('SideMenu', () => {
  beforeEach(() => {
    render(<SideMenu />)
  })

  it('renders menu Home', () => {
    const menuLink = screen.getByText("Home")
    expect(menuLink).toBeInTheDocument()
  })

  it('renders menu Task List', () => {
    const menuLink = screen.getByText("Task List")
    expect(menuLink).toBeInTheDocument()
  })

  it('renders menu Task Progress', () => {
    const menuLink = screen.getByText("Task Progress")
    expect(menuLink).toBeInTheDocument()
  })
});