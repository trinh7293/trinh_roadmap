// import React from 'react'
import ReactDOM from 'react-dom/client'

// import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Flow from './routes/Flow'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/boards',
    element: <div>Hello world!</div>
  },
  {
    path: '/flow/:flowId',
    element: <Flow />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
