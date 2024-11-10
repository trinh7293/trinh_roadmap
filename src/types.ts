import { Node, NodeProps } from '@xyflow/react'
import { FlowRole } from './constants'

export type DataNode = {
  label: string
}
export interface CustomNodeProps extends NodeProps {
  data: DataNode
}
export interface CustomNode extends Node {
  data: DataNode
}

export interface User {
  id: string
  name: string
}

export type AppState = {
  user: User
  flows: string[]
  currentFlowMems: User[]
  getUserFlows: () => void
}

export type Flow = {
  id: string
  name: string
  role: FlowRole // role of current user in this flow
}
