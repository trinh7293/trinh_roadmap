import { nanoid } from 'nanoid/non-secure'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()
  const toNewFlow = () => {
    const flowId = nanoid()
    navigate(`/flow/${flowId}`)
  }
  return (
    <div>
      <button onClick={toNewFlow}>Create new flow</button>
    </div>
  )
}

export default App
