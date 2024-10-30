import { useCallback, useEffect, useRef } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Edge,
  Background,
  Position,
  Panel,
  NodeOrigin,
  OnConnectEnd,
  useReactFlow
} from '@xyflow/react'
import dagre from '@dagrejs/dagre'
import '@xyflow/react/dist/style.css'
import { useShallow } from 'zustand/react/shallow'
import useStore from './store'

import TextUpdaterNode from './components/TextUpdaterNode'
import { AppState, CustomNode } from './types'
import { nanoid } from 'nanoid/non-secure'

const nodeTypes = {
  textUpdater: TextUpdaterNode
}

const nodeWidth = 172
const nodeHeight = 40
const defaultLabel = 'New Node'
const edgeType = 'smoothstep'

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (nodes: CustomNode[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode: CustomNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    }

    return newNode
  })

  return { nodes: newNodes, edges }
}

const nodeOrigin: NodeOrigin = [0.5, 0]

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNewNode: state.addNewNode,
  addNewEdge: state.addNewEdge,
  setNodes: state.setNodes,
  setEdges: state.setEdges
})

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null)

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { nodes, edges, addNewNode, addNewEdge, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect } =
    useStore(useShallow(selector))
  const { screenToFlowPosition } = useReactFlow()
  useEffect(() => {
    const newNodeId = nanoid()
    const firstNode: CustomNode = {
      id: newNodeId,
      type: 'textUpdater',
      data: { label: defaultLabel },
      position: { x: 0, y: 50 }
    }
    addNewNode(firstNode)
  }, [])
  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
        const newNodeId = nanoid()
        const newNode: CustomNode = {
          id: newNodeId,
          type: 'textUpdater',
          position: screenToFlowPosition({
            x: clientX,
            y: clientY
          }),
          data: { label: defaultLabel },
          origin: [0.5, 0.0]
        }

        addNewNode(newNode)
        const newEdgeId = nanoid()
        const newEdge: Edge = {
          id: newEdgeId,
          type: edgeType,
          animated: true,
          source: connectionState?.fromNode?.id || '',
          target: newNodeId
        }
        addNewEdge(newEdge)
      }
    },
    [screenToFlowPosition]
  )
  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction)

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [nodes, edges]
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
        <Panel position='top-right'>
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </Panel>
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
