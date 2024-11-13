import { signUpService } from '@/services/authService'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Signup() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const handleSignup = async () => {
    await signUpService(email, pass)
  }
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </Form.Group>
      {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
        <Form.Check type='checkbox' label='Check me out' />
      </Form.Group> */}
      <Button variant='primary' onClick={handleSignup}>
        Sign Up
      </Button>
    </Form>
  )
}

export default Signup
