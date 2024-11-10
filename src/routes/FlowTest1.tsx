import { useParams } from 'react-router-dom'

export default function FlowTest1() {
  const { flowId } = useParams()
  return <div>flowId: {flowId}</div>
}
