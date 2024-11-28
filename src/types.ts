import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange
} from '@xyflow/react'
import { User } from 'firebase/auth'

export enum NodeTypeEnum {
  INPUT = 'input',
  DEFAULT = 'default',
  OUTPUT = 'output'
}

export interface AppSlice {
  user: User | null
  flows: Flow[]
  currentFlowMems: User[]
  // getUserFlows: () => void
  setFlows: (flows: Flow[]) => void
  setUser: (user: User) => void
  clearAuth: () => void
}

export type EdittingNode = {
  label: string
}

export interface FlowSlice {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  onNodeClick: (event: React.MouseEvent, node: Node) => void
  setNodes: (nodes: Node[]) => void
  edditingNodeId: string | null
  edittingNode: () => EdittingNode | null
  updateNodeLabel: (label: string) => void
  currType: NodeTypeEnum | null // current dragging node
  setCurrType: (nt: NodeTypeEnum) => void
}

export type Flow = {
  id?: string
  name: string
  description: string
  authorId: string
}
