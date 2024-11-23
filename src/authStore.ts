import create from 'zustand'

import { Flow, type AppSlice } from '@/types'
import { User } from 'firebase/auth'

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useMainStore = create<AppSlice>((set) => ({
  user: null,
  flows: [],
  currentFlowMems: [],
  setFlows: (flows: Flow[]) => {
    set({
      flows
    })
  },
  setUser: (user: User) => {
    set({ user })
  },
  clearAuth: () => {
    set({
      user: null,
      flows: [],
      currentFlowMems: []
    })
  }
}))

export default useMainStore
