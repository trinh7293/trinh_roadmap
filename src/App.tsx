import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListFlow from '@routes/ListFlow'
import Flow from '@/routes/Flow'
import Signup from '@/routes/SignUp'
import Login from '@/routes/Login'
// import Layout from '@/routes/Layout'
import AuthLayout from './routes/AuthLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<AuthLayout />}> */}
        <Route path='/' element={<ListFlow />}></Route>
        <Route path='/flow/:flowId' element={<Flow />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        {/* <Route element={<Layout />}> */}
        {/* </Route> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
