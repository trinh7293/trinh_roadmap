import { memo } from 'react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { onTextChangeFunc } from '../types'
interface CustomNodeProps extends NodeProps {
  data: {
    color: string
    onTextChange: onTextChangeFunc
  }
}

export default memo(function ColorSel({ data, isConnectable, id: nodeId }: CustomNodeProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    data.onTextChange(event, nodeId)
  }
  return (
    <>
      <Handle
        type='target'
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor='text'>Text:</label>
        <input id='text' name='text' onChange={onChange} className='nodrag' />
      </div>
      <Handle
        type='source'
        position={Position.Right}
        id='a'
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  )
})
