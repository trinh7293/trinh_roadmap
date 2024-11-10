import { useCallback, useEffect, useRef } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Edge,
  Background,
  //   Position,
  Panel,
  NodeOrigin,
  OnConnectEnd,
  useReactFlow,
  XYPosition,
  OnNodesChange,
  OnEdgesChange,
  OnConnect
} from '@xyflow/react'
// import dagre from '@dagrejs/dagre'
import '@xyflow/react/dist/style.css'

import TextUpdaterNode from '../components/TextUpdaterNode'
import { CustomNode } from '../types'
import { nanoid } from 'nanoid/non-secure'
// import { DEFAULT_LABEL, EDGE_TYPE } from '../constants'
import { DEFAULT_LABEL, EDGE_TYPE } from '@/constants'
import { useParams } from 'react-router-dom'
import { initWSCProvider, liveStore } from '@/liveStore'
import { isValidPosition } from '@/helper/utils'
import { useSyncedStore } from '@syncedstore/react'
import _ from 'lodash'

const nodeTypes = {
  textUpdater: TextUpdaterNode
}

// const nodeWidth = 300
// const nodeHeight = 40

// const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

// const getLayoutedElements = (nodes: CustomNode[], edges: Edge[], direction = 'TB') => {
//   const isHorizontal = direction === 'LR'
//   dagreGraph.setGraph({ rankdir: direction })

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
//   })

//   edges.forEach((edge) => {
//     edge.type = EDGE_TYPE
//     edge.animated = true
//     dagreGraph.setEdge(edge.source, edge.target)
//   })

//   dagre.layout(dagreGraph)

//   const newNodes = nodes.map((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id)
//     const newNode: CustomNode = {
//       ...node,
//       targetPosition: isHorizontal ? Position.Left : Position.Top,
//       sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
//       // We are shifting the dagre node position (anchor=center center) to the top left
//       // so it matches the React Flow node anchor point (top left).
//       position: {
//         x: nodeWithPosition.x - nodeWidth / 2,
//         y: nodeWithPosition.y - nodeHeight / 2
//       }
//     }

//     return newNode
//   })

//   return { nodes: newNodes, edges }
// }

const nodeOrigin: NodeOrigin = [0.5, 0]

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
  const state = useSyncedStore(liveStore)
  const { flowId } = useParams()
  useEffect(() => {
    if (flowId) {
      // const { connect, disconnect } = initRTCProvider(flowId)
      const { connect, disconnect } = initWSCProvider(flowId)
      connect()
      return () => {
        disconnect()
      }
    }
  }, [])
  const reactFlowWrapper = useRef(null)
  const { screenToFlowPosition } = useReactFlow()

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event
        const newNodePosition = screenToFlowPosition({
          x: clientX,
          y: clientY
        })
        const newNode = initNewNode(newNodePosition)

        state.nodes.push(newNode)
        const newEdgeId = nanoid()
        const newEdge: Edge = {
          id: newEdgeId,
          type: EDGE_TYPE,
          animated: true,
          source: connectionState?.fromNode?.id || '',
          target: newNode.id
        }
        state.edges.push(newEdge)
      }
    },
    [screenToFlowPosition]
  )
  const clearData = () => {
    state.nodes.splice(0, state.nodes.length)
    state.edges.splice(0, state.edges.length)
  }

  //   const onLayout = (direction: string) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(state.nodes, state.edges, direction)

  //     clearData()
  //     state.nodes.push(...layoutedNodes)
  //     state.edges.push(...layoutedEdges)
  //   }
  //   const handleSave = async () => {
  //     const flowData = {
  //       nodes,
  //       edges
  //     }
  //     if (flowId) {
  //       await setBoardData(flowId, flowData)
  //     }
  //   }
  const handleNewNodeBtn = useCallback(() => {
    const position = {
      x: Math.random() * 500,
      y: Math.random() * 500
    }
    const newNode = initNewNode(position)
    state.nodes.push(newNode)
  }, [])
  const handleOnNodesChange: OnNodesChange = (changes) => {
    // console.log(changes)
    changes.forEach((c) => {
      if (c.type === 'dimensions') {
        const n = state.nodes.find((node) => node.id === c.id)
        if (n && c.dimensions) {
          const { height, width } = c.dimensions
          n.measured = { height, width }
        }
      }
      if (c.type === 'position') {
        const n = state.nodes.find((node) => node.id === c.id)
        if (n && c.position && isValidPosition(c.position)) {
          n.dragging = c.dragging
          n.position = c.position
        }
      }
      if (c.type === 'select') {
        const n = state.nodes.find((node) => node.id === c.id)
        if (n) {
          n.selected = c.selected
        }
      }
      if (c.type === 'remove') {
        const n = state.nodes.find((node) => node.id === c.id)
        if (n) {
          const ind = state.nodes.findIndex((n) => n.id === c.id)
          state.nodes.splice(ind, 1)
        }
      }
    })
  }
  const handleOnedgesChange: OnEdgesChange = (changes) => {
    console.log(changes)
    changes.forEach((c) => {
      if (c.type === 'remove') {
        const n = state.edges.find((e) => e.id === c.id)
        if (n) {
          const ind = state.edges.findIndex((e) => e.id === c.id)
          state.edges.splice(ind, 1)
        }
      }
    })
  }
  const onConnect: OnConnect = useCallback((params) => {
    const newEdge: Edge = {
      id: nanoid(),
      source: params.source,
      target: params.target
    }
    state.edges.push(newEdge)
  }, [])
  const nodes = _.cloneDeep(state.nodes)
  const edges = _.cloneDeep(state.edges)
  return (
    <div className='wrapper' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleOnNodesChange}
        onEdgesChange={handleOnedgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
      >
        <Panel position='top-right'>
          <button onClick={() => handleNewNodeBtn()}>ADD NEW NODE</button>
          <button onClick={() => clearData()}>CLEAR</button>
          {/* <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>  */}
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  )
}

const Flow = () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
)

export default Flow
