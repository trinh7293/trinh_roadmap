// import React from 'react'
import ReactDOM from 'react-dom/client'

// import App from './App'
import Board from './routes/Board'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>
  },
  {
    path: '/boards',
    element: <div>Hello world!</div>
  },
  {
    path: '/board/:boardId',
    element: <Board />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
