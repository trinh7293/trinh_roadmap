import { AppSlice, FlowSlice, NodeTypeEnum } from '@/types'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  Node as AppNode,
  NodeChange
} from '@xyflow/react'
import { StateCreator } from 'zustand'

export const createFlowSlice: StateCreator<
  AppSlice & FlowSlice,
  [],
  [],
  FlowSlice
> = (set, get) => ({
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
  edditingNodeId: null,
  edittingNode: () => {
    const nId = get().edditingNodeId
    if (nId) {
      const n = get().nodes.find((n) => n.id === nId)
      if (n) {
        const result = {
          label: n.data.label as string
        }
        return result
      }
    }
    return null
  },
  updateNodeLabel: (label) => {
    const edittingId = get().edditingNodeId
    set({
      nodes: get().nodes.map((n) => {
        if (n.id === edittingId) {
          return { ...n, data: { ...n.data, label } }
        }
        return n
      })
    })
  },
  onNodeClick: (_, node) => {
    set({
      edditingNodeId: node.id
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
})
