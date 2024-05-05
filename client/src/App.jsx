import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserProfile from './pages/UserProfile'
import Protected from './components/Protected'
import Edit from './pages/Edit'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Protected />} path='/'>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/user-profile/:userid" element={<UserProfile />} />
        <Route path="/edit/:userid" element={<Edit />} />
      </Routes >
      <Toaster position='top-center' />
    </>
  )
}

export default App