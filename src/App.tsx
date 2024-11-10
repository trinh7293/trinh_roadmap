// import { nanoid } from 'nanoid/non-secure'
// import { useNavigate } from 'react-router-dom'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListFlow from '@routes/ListFlow'
// import AddData from '@routes/AddData'
// import FlowTest1 from './routes/FlowTest1'
import Flow from './routes/Flow'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListFlow />}></Route>
        {/* <Route path='/addData' element={<AddData />}></Route> */}
        <Route path='/flow/:flowId' element={<Flow />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
