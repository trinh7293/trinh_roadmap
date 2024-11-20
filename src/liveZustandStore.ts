import { LiveState, NodeTypeEnum } from './types'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  Node as AppNode,
  NodeChange
} from '@xyflow/react'
import { createClient, EnsureJson } from '@liveblocks/client'
import { liveblocks, WithLiveblocks } from '@liveblocks/zustand'
import create from 'zustand'

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

type Storage = EnsureJson<{
  nodes: LiveState['nodes']
  edges: LiveState['edges']
}>

const useLiveStore = create<WithLiveblocks<LiveState>>()(
  liveblocks(
    (set, get) => ({
      // Initial values for nodes and edges
      nodes: [],
      edges: [],

      // Apply changes to React Flow when the flowchart is interacted with
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes)
        })
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges)
        })
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges)
        })
      },
      setNodes: (nodes: AppNode[]) => {
        set({
          nodes
        })
      },
      currType: null,
      setCurrType: (currType: NodeTypeEnum) => {
        set({
          currType
        })
      }
    }),
    {
      // Add Liveblocks client
      client,

      // Define the store properties that should be shared in real-time
      storageMapping: {
        nodes: true,
        edges: true
      }
    }
  )
)

export default useLiveStore
