import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange
} from '@xyflow/react'
import { User } from 'firebase/auth'

export type AppState = {
  user: User | null
  flows: Flow[]
  currentFlowMems: User[]
  // getUserFlows: () => void
  setFlows: (flows: Flow[]) => void
  setUser: (user: User) => void
  clearAuth: () => void
}

export enum NodeTypeEnum {
  INPUT = 'input',
  DEFAULT = 'default',
  OUTPUT = 'output'
}

export type LiveState = {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  setNodes: (nodes: Node[]) => void
  currType: NodeTypeEnum | null // current dragging node
  setCurrType: (nt: NodeTypeEnum) => void
}

export type Flow = {
  id?: string
  name: string
  description: string
  authorId: string
}
