import { Outlet, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import useMainStore from '@/store'
import { AppState } from '@/types'
const selector = (state: AppState) => ({
  setUser: state.setUser,
  clearAuth: state.clearAuth
})
function AuthLayout() {
  const { setUser, clearAuth } = useMainStore(useShallow(selector))
  const navi = useNavigate()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      navi('./')
    } else {
      clearAuth()
      navi('./')
    }
  })
  return <Outlet />
}

export default AuthLayout
