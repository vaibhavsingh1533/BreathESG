import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuditLogs from './pages/AuditLogs'

import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'


function App() {

  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

  }, [darkMode])


  return (

    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={
            <Dashboard
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path='/upload'
          element={
            <UploadPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
  path='/audit-logs'
  element={
    <AuditLogs
      darkMode={darkMode}
    />
  }
/>

      </Routes>

    </BrowserRouter>
  )
}

export default App