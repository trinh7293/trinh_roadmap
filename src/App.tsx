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
  Edge,
  Background,
  Position,
  Panel
} from '@xyflow/react'
import dagre from '@dagrejs/dagre'
import '@xyflow/react/dist/style.css'

import TextUpdaterNode from './components/TextUpdaterNode'
import { CustomNode, onTextChangeFunc } from './types'
import { nanoid } from 'nanoid/non-secure'
const edgeType = 'smoothstep'

const nodeTypes = {
  textUpdater: TextUpdaterNode
}

const initialNodes: CustomNode[] = []
const initialEdges: Edge[] = []
const nodeWidth = 172
const nodeHeight = 40
const defaultLabel = 'New Node'

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

// const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges)

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
    const newNodeId = nanoid()
    const firstNode: CustomNode = {
      id: newNodeId,
      type: 'textUpdater',
      data: { onTextChange: onTextChange, label: defaultLabel },
      position: { x: 0, y: 50 }
    }
    setNodes([firstNode])
  }, [])

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
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
          data: { onTextChange: onTextChange, label: defaultLabel },
          origin: [0.5, 0.0]
        }

        setNodes((nds) => nds.concat(newNode))
        const newEdgeId = nanoid()
        const newEdge: Edge = {
          id: newEdgeId,
          type: edgeType,
          animated: true,
          source: connectionState?.fromNode?.id || '',
          target: newNodeId
        }
        setEdges((eds) => eds.concat(newEdge))
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
