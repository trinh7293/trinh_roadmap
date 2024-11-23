import Flow from '@/routes/Flow'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import AuthLayout from './routes/AuthLayout'
// import ListenerAuthLayout from './routes/ListenerAuthLayout'
import ListFlow from './routes/ListFlow'
import Login from './routes/Login'
import Signup from './routes/SignUp'
// import Welcome from './routes/Welcome'
import ListenerAuthLayout from './routes/ListenerAuthLayout'
// import Demo from './routes/Welcome'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Demo />}>
          <Route path='flow/:flowId' element={<Flow />}></Route>
        </Route> */}
        <Route path='/' element={<ListenerAuthLayout />}>
          {/* <Route path='/' element={<Welcome />}> */}
          {/* <Route element={huhu()}> */}
          <Route path='listFlow' element={<ListFlow />}></Route>
          <Route path='flow/:flowId' element={<Flow />}></Route>
          {/* </Route> */}
          <Route path='login' element={<Login />}></Route>
          <Route path='signup' element={<Signup />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <Flow />
  )
}

export default App
