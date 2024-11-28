import useBoundStore from '@/store'
import { NodeTypeEnum } from '@/types'
import { DragEvent } from 'react'
import { Form } from 'react-bootstrap'
export default function Sidebar() {
  const { setCurrType, edittingNode, updateNodeLabel } = useBoundStore()

  const onDragStart = (event: DragEvent, nodeType: NodeTypeEnum) => {
    setCurrType(nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
  const renderEditArea = () => {
    const editingN = edittingNode()
    if (editingN) {
      return (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Edit label</Form.Label>
            <Form.Control
              type='text'
              value={editingN.label}
              onChange={(e) => updateNodeLabel(e.target.value)}
              placeholder='name'
              autoFocus
            />
          </Form.Group>
        </Form>
      )
    }
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
      {renderEditArea()}
    </aside>
  )
}
