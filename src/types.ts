import { Node, NodeProps } from '@xyflow/react'
import { User } from 'firebase/auth'

export type DataNode = {
  label: string
}
export interface CustomNodeProps extends NodeProps {
  data: DataNode
}
export interface CustomNode extends Node {
  data: DataNode
}

export type AppState = {
  user: User | null
  flows: Flow[]
  currentFlowMems: User[]
  // getUserFlows: () => void
  setFlows: (flows: Flow[]) => void
  setUser: (user: User) => void
  clearAuth: () => void
}

export type Flow = {
  id?: string
  name: string
  description: string
  authorId: string
}
