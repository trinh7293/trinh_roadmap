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
  useReactFlow,
  XYPosition
} from '@xyflow/react'
import dagre from '@dagrejs/dagre'
import '@xyflow/react/dist/style.css'
import { useShallow } from 'zustand/react/shallow'
import useStore from './store'

import TextUpdaterNode from './components/TextUpdaterNode'
import { AppState, CustomNode } from './types'
import { nanoid } from 'nanoid/non-secure'
import { getBoardData, setBoardData } from './services/flowService'
import { DEFAULT_LABEL, EDGE_TYPE } from './constants'

const nodeTypes = {
  textUpdater: TextUpdaterNode
}

const nodeWidth = 300
const nodeHeight = 40

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const getLayoutedElements = (nodes: CustomNode[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    edge.type = EDGE_TYPE
    edge.animated = true
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
  currentBoard: state.currentBoard,
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNewNode: state.addNewNode,
  addNewEdge: state.addNewEdge,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  setDataLocal: state.setDataLocal
})

const initNewNode = (position: XYPosition) => {
  const newNodeId = nanoid()
  const newNode: CustomNode = {
    id: newNodeId,
    type: 'textUpdater',
    position,
    data: { label: DEFAULT_LABEL },
    origin: [0.5, 0.0]
  }
  return newNode
}

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null)

  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const {
    currentBoard,
    nodes,
    edges,
    addNewNode,
    addNewEdge,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setDataLocal
  } = useStore(useShallow(selector))
  const { screenToFlowPosition } = useReactFlow()
  useEffect(() => {
    if (currentBoard) {
      getBoardData(currentBoard.id, setDataLocal)
    }
  }, [])
  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event
        const newNodePosition = screenToFlowPosition({
          x: clientX,
          y: clientY
        })
        const newNode = initNewNode(newNodePosition)

        addNewNode(newNode)
        const newEdgeId = nanoid()
        const newEdge: Edge = {
          id: newEdgeId,
          type: EDGE_TYPE,
          animated: true,
          source: connectionState?.fromNode?.id || '',
          target: newNode.id
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
  const handleSave = async () => {
    const flowData = {
      nodes,
      edges
    }
    await setBoardData(currentBoard.id, flowData)
  }
  const handleNewNodeBtn = useCallback(() => {
    const position = {
      x: Math.random() * 500,
      y: Math.random() * 500
    }
    const newNode = initNewNode(position)
    addNewNode(newNode)
  }, [])

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
          <button onClick={() => handleNewNodeBtn()}>ADD NEW NODE</button>
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
          <button onClick={() => handleSave()}>SAVE to firestore</button>
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
