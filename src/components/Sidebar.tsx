import useBoundStore from '@/store'
import { NodeTypeEnum } from '@/types'
import { DragEvent } from 'react'
export default function Sidebar() {
  const { setCurrType } = useBoundStore()

  const onDragStart = (event: DragEvent, nodeType: NodeTypeEnum) => {
    setCurrType(nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div className='description'>
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className='dndnode input'
        onDragStart={(event) => onDragStart(event, NodeTypeEnum.INPUT)}
        draggable
      >
        Input Node
      </div>
      <div
        className='dndnode'
        onDragStart={(event) => onDragStart(event, NodeTypeEnum.DEFAULT)}
        draggable
      >
        Default Node
      </div>
      <div
        className='dndnode output'
        onDragStart={(event) => onDragStart(event, NodeTypeEnum.OUTPUT)}
        draggable
      >
        Output Node
      </div>
    </aside>
  )
}
