import { AppSlice, Flow, FlowSlice } from '@/types'
import { User as FirebaseUser } from 'firebase/auth'
import { StateCreator } from 'zustand'

export const createAppSlice: StateCreator<
  AppSlice & FlowSlice,
  [],
  [],
  AppSlice
> = (set) => ({
  user: null,
  flows: [],
  currentFlowMems: [],
  // getUserFlows: async () => {
  //   const user = get().user
  //   if (user) {
  //     const userId = user.uid
  //     const flows = await fetchUserFlows(userId)
  //     set({
  //       flows
  //     })
  //   }
  // },
  setFlows: (flows: Flow[]) => {
    set({
      flows
    })
  },
  setUser: (user: FirebaseUser) => {
    set({ user })
  },
  clearAuth: () => {
    set({
      user: null,
      flows: [],
      currentFlowMems: []
    })
  }
})
