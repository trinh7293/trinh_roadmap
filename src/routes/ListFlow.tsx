import useMainStore from '@/store'
import { AppState } from '@/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { logOutService } from '@/services/authService'
import { addFlowService, unsubUserFlows } from '@/services/flowService'
const selector = (state: AppState) => ({
  user: state.user,
  flows: state.flows,
  setFlows: state.setFlows
})

const ListFlow = () => {
  // const navi = useNavigate()
  const handleLogOut = async () => {
    await logOutService()
  }
  // const handleLogIn = () => {
  //   navi('login')
  // }
  const authBtn = () => {
    if (user) {
      return <Button onClick={handleLogOut}> Log Out</Button>
    } else {
      // return <Button onClick={handleLogIn}>Login</Button>
      return <Link to={'./login'}>Login</Link>
    }
  }
  const { user, flows, setFlows } = useMainStore(useShallow(selector))
  const [show, setShow] = useState(false)
  const [flowName, setFlowName] = useState('')
  const [flowDes, setFlowDes] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleAddFlow = async () => {
    if (user) {
      await addFlowService(user.uid, flowName, flowDes)
      setShow(false)
    }
  }
  useEffect(() => {
    if (user) {
      const unsubLstFlow = unsubUserFlows(user.uid, setFlows)
      console.log('unsubscribed list flow successfully')
      return () => {
        unsubLstFlow()
        console.log('unsubscribed list flow successfully')
      }
    }
  }, [user])
  return (
    <div>
      user: {JSON.stringify(user)}
      <br />
      status: {user ? 'logged in' : 'guest'}
      <br />
      {authBtn()}
      <br />
      flows: {!user && 'you need login to save works'}
      <br />
      {JSON.stringify(flows, null, 2)}
      {flows.map((fl, index) => (
        <div key={index}>
          to <Link to={`./flow/${fl.id}`}>{fl.name}</Link>
        </div>
      ))}
      <Button variant='primary' onClick={handleShow}>
        Create new Flow
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Flow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                placeholder='name'
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={flowDes}
                onChange={(e) => setFlowDes(e.target.value)}
                as='textarea'
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleAddFlow}>
            Save Flow
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ListFlow
