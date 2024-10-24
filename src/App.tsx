import { useCallback, useEffect, useRef } from 'react'
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  OnConnect,
  OnConnectEnd,
  Node,
  Edge,
  Background
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import TextUpdaterNode from './components/TextUpdaterNode'
import { onTextChangeFunc } from './types'

const nodeTypes = {
  textUpdater: TextUpdaterNode
}

const initialNodes: Node[] = []

const initialEdges: Edge[] = []

let id = 1
const getId = () => `${id++}`
const nodeOrigin: [number, number] = [0.5, 0]

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null)

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const { screenToFlowPosition } = useReactFlow()
  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])
  const onTextChange: onTextChangeFunc = useCallback((text: string, nodeId: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== nodeId) {
          return node
        }
        return {
          ...node,
          data: {
            ...node.data,
            label: text
          }
        }
      })
    )
  }, [])

  useEffect(() => {
    setNodes([
      {
        id: '0',
        type: 'textUpdater',
        data: { onTextChange: onTextChange },
        position: { x: 0, y: 50 }
      }
    ])
  }, [])

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId()
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
        const newNode: Node = {
          id,
          type: 'textUpdater',
          position: screenToFlowPosition({
            x: clientX,
            y: clientY
          }),
          data: { onTextChange: onTextChange },
          origin: [0.5, 0.0]
        }

        setNodes((nds) => nds.concat(newNode))
        const newEdge: Edge = { id, source: connectionState?.fromNode?.id || '', target: id }
        setEdges((eds) => eds.concat(newEdge))
      }
    },
    [screenToFlowPosition]
  )

  return (
    <div className='wrapper' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Background />
      </ReactFlow>
    </div>
  )
}

const App = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
)

export default App
