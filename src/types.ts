import {
  Edge,
  Node,
  NodeProps,
  OnConnect,
  OnEdgesChange,
  OnNodesChange
} from '@xyflow/react'

export type onTextChangeFunc = (nodeId: string, label: string) => void

export type DataNode = {
  label: string
}
export interface CustomNodeProps extends NodeProps {
  data: DataNode
}
export interface CustomNode extends Node {
  data: DataNode
}

export type AddNewNode = (node: CustomNode) => void
export type AddNewEdge = (edge: Edge) => void

export type AppState = {
  user: {
    id: string
    boards: string[]
  }
  currentBoard: {
    id: string
  }
  nodes: CustomNode[]
  edges: Edge[]
  onNodesChange: OnNodesChange<CustomNode>
  onEdgesChange: OnEdgesChange
  updateNodeLabel: onTextChangeFunc
  onConnect: OnConnect
  addNewNode: AddNewNode
  addNewEdge: AddNewEdge
  setNodes: (nodes: CustomNode[]) => void
  setEdges: (edges: Edge[]) => void
  setDataLocal: HandleDataFromServer
}

export type UserDoc = {
  id: string
  boards: string[] // boards that owned by this user
}

export type BoardDoc = {
  id: string
  ownerId: string // user who own this board
  memberId: string[] // list member of this board
  flowData: FlowData
}

export type FlowData = {
  nodes: CustomNode[]
  edges: Edge[]
}

export type HandleDataFromServer = (data: FlowData) => void
