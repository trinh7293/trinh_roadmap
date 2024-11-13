import useMainStore from '@/store'
import { AppState } from '@/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { logOutService } from '@/services/authService'
const selector = (state: AppState) => ({
  user: state.user,
  flows: state.flows,
  getUserFlows: state.getUserFlows
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
  const { user, flows, getUserFlows } = useMainStore(useShallow(selector))
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    if (user) {
      getUserFlows()
    }
  }, [])
  return (
    <div>
      user: {JSON.stringify(user)}
      status: {user ? 'logged in' : 'guest'}
      {authBtn()}
      flows: {!user && 'you need login to save works'}
      {flows.map((fl) => (
        <div key={fl}>
          to <Link to={`./flow/${fl}`}>{fl}</Link>
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
                type='email'
                placeholder='name@example.com'
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ListFlow
