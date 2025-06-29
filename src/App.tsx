import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { useAuthStore } from './store/authStore'
import { Toast } from './components/ui/Toast'

function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  )
}

export default App