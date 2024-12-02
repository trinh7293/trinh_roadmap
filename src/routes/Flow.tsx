import { useRef, useCallback, DragEvent, useEffect } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  useReactFlow,
  Background,
  Panel
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
// import Sidebar from '@/components/Sidebar'
import Sidebar from '@/components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid/non-secure'
import useBoundStore from '@/store'

// import { FlowPropTypes } from '@/types'

// const DnDFlow: FC<FlowPropTypes> = (props) => {
const DnDFlow = () => {
  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    setNodes,
    currType
  } = useBoundStore()
  const { flowId } = useParams()
  // if (!flowId) {
  //   // const genId = nanoid()
  //   flowId = 'demo-room'
  //   console.log('flowId generated', flowId)
  // }
  // const { flowId: flowIdRouter } = useParams()
  // const { flowIdProp } = props
  // const flowId = flowIdRouter || flowIdProp
  // const flowId = 'room3'
  // Enter the Liveblocks room on load
  useEffect(() => {
    if (flowId) {
      enterRoom(flowId)
      return () => leaveRoom()
    } else {
      console.log('room id not specified')
    }
  }, [enterRoom, leaveRoom])
  // TODO delete room when all leave

  const reactFlowWrapper = useRef(null)
  const { screenToFlowPosition } = useReactFlow()

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])
  const addNodeByEvent = useCallback(
    (e: DragEvent | React.MouseEvent) => {
      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      })
      const newNode = {
        id: nanoid(),
        type: 'default',
        position,
        data: { label: 'New node' }
      }

      setNodes([...nodes, newNode])
    },
    [screenToFlowPosition, nodes]
  )
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
      addNodeByEvent(event)
    },
    [screenToFlowPosition, currType]
  )
  const navi = useNavigate()
  const onBgClick = (e: React.MouseEvent) => {
    if (e.ctrlKey) {
      addNodeByEvent(e)
    }
  }
  if (!flowId) {
    return <div>flow id not specified huhu</div>
  }
  if (isStorageLoading) {
    return (
      <div className='loading'>
        <img src='https://liveblocks.io/loading.svg' alt='Loading' />
      </div>
    )
  }
  return (
    <div id='app'>
      <div className='dndflow'>
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            onClick={onBgClick}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
            style={{ backgroundColor: '#F7F9FB' }}
          >
            <Panel position='top-left' onClick={() => navi('/')}>
              Go home
            </Panel>
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

// const Flow: FC<FlowPropTypes> = (props) => {
//   return (
//     <ReactFlowProvider>
//       <DnDFlow />
//     </ReactFlowProvider>
//   )
// }

export default function Flow() {
  return (
    <ReactFlowProvider>
      <DnDFlow />
    </ReactFlowProvider>
  )
}
