import { AppSlice, FlowSlice } from '@/types'
import { create } from 'zustand'
import { createAppSlice } from './authSlice'
import { createFlowSlice } from './flowSlice'
import { createClient, EnsureJson } from '@liveblocks/client'
import { liveblocks, WithLiveblocks } from '@liveblocks/zustand'

type Storage = EnsureJson<{
  nodes: FlowSlice['nodes']
  edges: FlowSlice['edges']
}>

declare global {
  interface Liveblocks {
    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: Storage
  }
}

const client = createClient({
  publicApiKey: import.meta.env.VITE_APP_LIVEBLOCKS_PUBLIC_KEY as string,
  throttle: 16 // Updates every 16ms === 60fps animation
})

const useBoundStore = create<WithLiveblocks<AppSlice & FlowSlice>>()(
  liveblocks(
    (...a) => ({
      ...createAppSlice(...a),
      ...createFlowSlice(...a)
    }),
    {
      client,
      storageMapping: {
        nodes: true,
        edges: true
      }
    }
  )
)

export default useBoundStore
