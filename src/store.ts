import { create } from 'zustand'

import { type AppState } from './types'
import { fetchUserFlows } from './services/flowService'

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useMainStore = create<AppState>((set, get) => ({
  user: {
    id: 'trinh1Id',
    name: 'trinh 1 Name'
  },
  flows: [],
  currentFlowMems: [],
  getUserFlows: async () => {
    const user = get().user
    const userId = user.id
    const flows = await fetchUserFlows(userId)
    set({
      flows
    })
  }
}))

export default useMainStore
