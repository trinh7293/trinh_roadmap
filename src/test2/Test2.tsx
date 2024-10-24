import { useEffect, useCallback } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Node,
  Edge,
  Position,
  OnConnect
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import TextUpdaterNode from './TextUpdaterNodeTest'
import { onTextChangeFunc } from '../types'

const connectionLineStyle = { stroke: '#fff' }
const snapGrid: [number, number] = [20, 20]
const nodeTypes = {
  textUpdater: TextUpdaterNode
}
const initNodes: Node[] = []
const initEdges: Edge[] = []
const defaultViewport = { x: 0, y: 0, zoom: 1.5 }

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges)

  useEffect(() => {
    const onTextChange: onTextChangeFunc = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== nodeId) {
            return node
          }

          const text = event.target.value

          // setBgColor(color)

          return {
            ...node,
            data: {
              ...node.data,
              label: text
            }
          }
        })
      )
    }

    setNodes([
      {
        id: '1',
        type: 'textUpdater',
        data: { onTextChange: onTextChange },
        position: { x: 0, y: 50 },
        sourcePosition: Position.Right
      },
      {
        id: '2',
        type: 'textUpdater',
        data: { onTextChange: onTextChange },
        style: { border: '1px solid #777', padding: 10 },
        position: { x: 300, y: 50 }
      },
      {
        id: '3',
        type: 'textUpdater',
        data: { onTextChange: onTextChange },
        position: { x: 650, y: 25 },
        targetPosition: Position.Left
      },
      {
        id: '4',
        type: 'textUpdater',
        data: { onTextChange: onTextChange },
        position: { x: 650, y: 100 },
        targetPosition: Position.Left
      }
    ])

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#fff' }
      },
      {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        style: { stroke: '#fff' }
      },
      {
        id: 'e2b-4',
        source: '2',
        target: '4',
        sourceHandle: 'b',
        animated: true,
        style: { stroke: '#fff' }
      }
    ])
  }, [])

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  )
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition='bottom-left'
    >
      {/* <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === 'input') return '#0041d0'
          if (n.type === 'selectorNode') return bgColor
          if (n.type === 'output') return '#ff0072'
          return '#ff0072'
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return bgColor
          return '#fff'
        }}
      /> */}
      <Controls />
    </ReactFlow>
  )
}

export default CustomNodeFlow
