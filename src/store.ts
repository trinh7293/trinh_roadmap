import { create } from 'zustand'

import { type AppState } from '@/types'
import { fetchUserFlows } from '@/services/flowService'
import { User } from 'firebase/auth'

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useMainStore = create<AppState>((set, get) => ({
  user: null,
  flows: [],
  currentFlowMems: [],
  getUserFlows: async () => {
    const user = get().user
    if (user) {
      const userId = user.uid
      const flows = await fetchUserFlows(userId)
      set({
        flows
      })
    }
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
