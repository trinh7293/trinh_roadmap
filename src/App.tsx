import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListFlow from '@routes/ListFlow'
import Flow from '@/routes/Flow'
import Signup from '@/routes/SignUp'
import Login from '@/routes/Login'
import ListenerAuthLayout from './routes/ListenerAuthLayout'
import AuthLayout from '@/routes/AuthLayout'

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<ListenerAuthLayout />}>
    //       <Route element={<AuthLayout />}>
    //         <Route index element={<ListFlow />}></Route>
    //         <Route path='flow/:flowId' element={<Flow />}></Route>
    //       </Route>
    //       <Route path='login' element={<Login />}></Route>
    //       <Route path='signup' element={<Signup />}></Route>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <Flow />
  )
}

export default App
