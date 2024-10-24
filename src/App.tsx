import { useCallback, useRef } from 'react'
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
  Edge
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import './index.css'

const initialNodes: Node[] = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Node' },
    position: { x: 0, y: 50 }
  }
]

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

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId()
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
        const newNode: Node = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY
          }),
          data: { label: `Node ${id}` },
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
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      />
    </div>
  )
}

const App = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
)

export default App
