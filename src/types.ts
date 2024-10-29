import { Node, NodeProps } from '@xyflow/react'

export type onTextChangeFunc = (text: string, nodeId: string) => void

export type DataNode = {
  label: string
  onTextChange: onTextChangeFunc
}
export interface CustomNodeProps extends NodeProps {
  data: DataNode
}
export interface CustomNode extends Node {
  data: DataNode
}
