import { AtomKeys } from '@/constants'
import { ActiveMenu } from '@/types'
import { atom } from 'recoil'

export const activeMenuState = atom<ActiveMenu>({
  key: AtomKeys.MENU,
  default: {
    isOpen: false,
    key: null,
    activeTask:null
  },
})
