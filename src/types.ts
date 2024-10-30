import { Edge, Node, NodeProps, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react'

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
}
