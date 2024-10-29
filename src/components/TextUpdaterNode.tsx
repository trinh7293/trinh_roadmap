import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { CustomNodeProps } from '../types'

export default memo(function ColorSel({ data, isConnectable, id: nodeId }: CustomNodeProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    data.onTextChange(text, nodeId)
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
