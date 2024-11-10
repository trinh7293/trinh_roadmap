import useMainStore from '@/store'
import { AppState } from '@/types'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/shallow'

const selector = (state: AppState) => ({
  user: state.user,
  flows: state.flows,
  getUserFlows: state.getUserFlows
})

const ListFlow = () => {
  const { user, flows, getUserFlows } = useMainStore(useShallow(selector))
  useEffect(() => {
    getUserFlows()
  }, [])
  return (
    <div>
      user: {JSON.stringify(user)}
      flows:
      {flows.map((fl) => (
        <div key={fl}>
          to <Link to={`./flow/${fl}`}>{fl}</Link>
        </div>
      ))}
    </div>
  )
}
export default ListFlow
