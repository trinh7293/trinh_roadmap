import { memo, useState } from 'react'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { onTextChangeFunc } from '../types'
interface CustomNodeProps extends NodeProps {
  data: {
    color: string
    onTextChange: onTextChangeFunc
  }
}

export default memo(function ColorSel({ data, isConnectable, id: nodeId }: CustomNodeProps) {
  const [content, setContent] = useState('new node')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    data.onTextChange(text, nodeId)
    setContent(text)
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
        <input type='text' value={content} onChange={handleChange} className='nodrag' />
      </div>
      <Handle type='source' position={Position.Bottom} id='a' isConnectable={isConnectable} />
    </>
  )
})
