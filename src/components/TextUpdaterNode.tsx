import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { CustomNodeProps } from '@./types'
import { useSyncedStore } from '@syncedstore/react'
import { liveStore } from '@/liveStore'

// const selector = (state: AppState) => ({
//   updateNodeLabel: state.updateNodeLabel
// })
export default memo(function TextInputNode({
  id: nodeId,
  data,
  isConnectable,
  sourcePosition,
  targetPosition
}: CustomNodeProps) {
  // const { updateNodeLabel } = useStore(useShallow(selector))
  const state = useSyncedStore(liveStore)
  const node = state.nodes.find((n) => n.id === nodeId)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = event.target.value
    // updateNodeLabel(nodeId, label)
    if (node) {
      node.data.label = newLabel
    }
  }
  return (
    <>
      <Handle
        type='target'
        position={targetPosition || Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <input
          type='text'
          value={data.label}
          onChange={handleChange}
          className='nodrag'
        />
      </div>
      <Handle
        type='source'
        position={sourcePosition || Position.Bottom}
        id='a'
        isConnectable={isConnectable}
      />
    </>
  )
})
