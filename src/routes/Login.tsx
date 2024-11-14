import { signInService } from '@/services/authService'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const navi = useNavigate()
  const handleLogin = async () => {
    await signInService(email, pass)
    navi('/')
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
      <Form.Text className='text-muted'>
        Don&apos;t have account? Please <Link to={'/signup'}>Sign up</Link>
      </Form.Text>
      <Button variant='primary' onClick={handleLogin}>
        Sign In
      </Button>
    </Form>
  )
}

export default Login
