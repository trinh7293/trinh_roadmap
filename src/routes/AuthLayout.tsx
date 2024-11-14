import { logOutService } from '@/services/authService'
import useMainStore from '@/store'
import { AppState } from '@/types'
import { Button } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'

const selector = (state: AppState) => ({
  user: state.user
})
function AuthLayout() {
  const { user } = useMainStore(useShallow(selector))
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
