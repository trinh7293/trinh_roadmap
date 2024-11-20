import { useRef, useCallback, DragEvent, useEffect } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  useReactFlow,
  Background
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import '@/styles/Flow.css'
// import Sidebar from '@/components/Sidebar'
import useLiveStore from '@/liveZustandStore'
import Sidebar from '@/components/Sidebar'

let id = 0
const getId = () => `dndnode_${id++}`

const DnDFlow = () => {
  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    currType
  } = useLiveStore()
  const roomId = 'room3'
  // Enter the Liveblocks room on load
  useEffect(() => {
    enterRoom(roomId)
    return () => leaveRoom()
  }, [enterRoom, leaveRoom])

  const reactFlowWrapper = useRef(null)
  const { screenToFlowPosition } = useReactFlow()

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()

      // check if the dropped element is valid
      if (!currType) {
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
        type: currType,
        position,
        data: { label: `${currType} node` }
      }

      setNodes([...nodes, newNode])
    },
    [screenToFlowPosition, currType]
  )

  if (isStorageLoading) {
    return (
      <div className='loading'>
        <img src='https://liveblocks.io/loading.svg' alt='Loading' />
      </div>
    )
  }
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
      <DnDFlow />
    </ReactFlowProvider>
  )
}
