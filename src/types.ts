import { Node, NodeProps } from '@xyflow/react'
import { FlowRole } from '@/constants'
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
  flows: string[]
  currentFlowMems: User[]
  getUserFlows: () => void
  setUser: (user: User) => void
  clearAuth: () => void
}

export type Flow = {
  id: string
  name: string
  role: FlowRole // role of current user in this flow
}
