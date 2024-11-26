import useBoundStore from '@/store'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Welcome() {
  const { user } = useBoundStore()
  const navi = useNavigate()
  const authStat = () => {
    if (user) {
      return (
        <div>
          {JSON.stringify(user)}
          <Link to={'/listFlow'}>to list flows</Link>
          <Button onClick={() => navi('/flow/demo')}>try a demo</Button>
        </div>
      )
    } else {
      return <Link to={'/login'}>Login</Link>
    }
  }
  return <div>auth stat: {authStat()}</div>
}
