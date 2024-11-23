import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import useBoundStore from '@/store'
import { useEffect } from 'react'
function ListenerAuthLayout() {
  const { setUser, clearAuth } = useBoundStore()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        // navi('/')
      } else {
        clearAuth()
        // navi('/')
      }
    })
    return () => {
      unsub()
    }
  }, [])
  // const navi = useNavigate()
  return <Outlet />
}

export default ListenerAuthLayout
