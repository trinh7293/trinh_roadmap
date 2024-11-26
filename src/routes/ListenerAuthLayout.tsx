import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { useEffect } from 'react'
import useBoundStore from '@/store'
function ListenerAuthLayout() {
  const { setUser, clearAuth } = useBoundStore()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log('listened user: ', JSON.stringify(user, null, 2))
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
  // if (!user) {
  //   return <Welcome />
  // }
  return <Outlet />
}

export default ListenerAuthLayout
