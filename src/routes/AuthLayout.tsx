import { logOutService } from '@/services/authService'
import useBoundStore from '@/store'
import { Button } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'

function AuthLayout() {
  const { user } = useBoundStore()
  const navi = useNavigate()
  const handleLogOut = async () => {
    await logOutService()
  }
  const handleLogIn = async () => {
    navi('/login')
  }
  const authBtn = () => {
    if (user) {
      return <Button onClick={handleLogOut}> Log Out</Button>
    } else {
      return <Button onClick={handleLogIn}>Login</Button>
    }
  }
  return (
    <div>
      <div>{authBtn()}</div>
      <Outlet></Outlet>
    </div>
  )
}

export default AuthLayout
