import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { AppState, CustomNodeProps } from '../types'
import useStore from '../store'
import { useShallow } from 'zustand/react/shallow'

const selector = (state: AppState) => ({
  updateNodeLabel: state.updateNodeLabel
})
export default memo(function ColorSel({ id: nodeId, data, isConnectable }: CustomNodeProps) {
  const { updateNodeLabel } = useStore(useShallow(selector))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value
    updateNodeLabel(nodeId, label)
  }
  return (
    <>
      <Handle
        type='target'
        position={Position.Top}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <input type='text' value={data.label} onChange={handleChange} className='nodrag' />
      </div>
      <Handle type='source' position={Position.Bottom} id='a' isConnectable={isConnectable} />
    </>
  )
})
