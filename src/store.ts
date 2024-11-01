import { create } from 'zustand'
import { applyNodeChanges, applyEdgeChanges, Edge } from '@xyflow/react'

import { type AppState } from './types'
import { nanoid } from 'nanoid/non-secure'
import { EDGE_TYPE } from './constants'

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>((set, get) => ({
  user: {
    id: 'trinh',
    boards: ['trinh_board_1']
  },
  currentBoard: {
    id: 'trinh_board_1'
  },
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    })
  },
  onConnect: (connection) => {
    const newEdgeId = nanoid()
    const newEdge: Edge = {
      id: newEdgeId,
      type: EDGE_TYPE,
      animated: true,
      source: connection.source,
      target: connection.target
    }
    set({
      edges: [...get().edges, newEdge]
    })
  },

  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          return { ...node, data: { ...node.data, label } }
        }

        return node
      })
    })
  },
  addNewNode: (newNode) => {
    set({
      nodes: [...get().nodes, newNode]
    })
  },
  addNewEdge: (newEdge) => {
    set({
      edges: [...get().edges, newEdge]
    })
  },
  setNodes: (nodes = []) => {
    set({ nodes })
  },
  setEdges: (edges = []) => {
    set({ edges })
  },
  setDataLocal(data) {
    set({
      nodes: data.nodes || [],
      edges: data.edges || []
    })
  }
}))

export default useStore
