import { activeMenuState } from '@/features/menuAtoms'
import { useRecoilState } from 'recoil'

export const useMenu = ({ key, taskId }: { key: string; taskId?: number }) => {
  const [menuState, setMenuState] = useRecoilState(activeMenuState)

  const setIsMenuOpen = (status: boolean) => {
    setMenuState({
      key: key || null,
      isOpen: status,
      activeTask: taskId || null,
    })
  }

  const open = () => {
    setIsMenuOpen(true)
    setMenuState({
      key: key || null,
      isOpen: true,
      activeTask: taskId || null,
    })
  }
  const close = () => {
    setIsMenuOpen(false)
    setMenuState({
      key: key || null,
      isOpen: false,
      activeTask: taskId || null,
    })
  }

  return {
    isMenuOpen:
      menuState.isOpen && key === menuState.key
        ? taskId
          ? taskId == menuState.activeTask
          : true
        : false,
    setIsMenuOpen,
    open,
    close,
    activeKey: menuState.key,
    activeTask:menuState.activeTask
  }
}
