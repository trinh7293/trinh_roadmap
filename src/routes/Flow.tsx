import { useRef, useCallback, DragEvent } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  OnConnect
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'

import Sidebar from '@/components/Sidebar'
import { DnDContextType, DnDProvider, useDnD } from '@/components/DnDContext'

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 }
  }
]

let id = 0
const getId = () => `dndnode_${id++}`

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { screenToFlowPosition } = useReactFlow()
  const { nodeType } = useDnD() as DnDContextType

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      // check if the dropped element is valid
      if (!nodeType) {
        return
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      })
      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: { label: `${nodeType} node` }
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, nodeType]
  )

  return (
    <div className='dndflow'>
      <div className='reactflow-wrapper' ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          style={{ backgroundColor: '#F7F9FB' }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  )
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <DnDFlow />
      </DnDProvider>
    </ReactFlowProvider>
  )
}
