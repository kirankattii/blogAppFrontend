import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogDetails from './pages/BlogDetails'
import MyBlogs from './pages/MyBlogs'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/myblog" element={<MyBlogs />} />
        <Route path="/myprofile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
