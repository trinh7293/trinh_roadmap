import Flow from '@/routes/Flow'

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
