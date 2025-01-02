import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/context'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)
  const logout = () => {
    setToken(false)
    localStorage.removeItem('blogtoken')
  }
  console.log(token, userData);


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <h1 className='text-2xl font-bold cursor-pointer text-primary' onClick={() => navigate('/')}>BLOGS</h1>
      <ul className='hidden md:flex items-start font-medium gap-5'>
        <NavLink to={'/'}>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 b w-3/5 m-auto bg-primary hidden' />
        </NavLink>
        <NavLink to={'/myblog'}>
          <li className='py-1'>My Blogs</li>
          <hr className='border-none outline-none h-0.5 b w-3/5 m-auto bg-primary hidden' />
        </NavLink>
        <NavLink to={'/myprofile'}>
          <li className='py-1'>My Profile</li>
          <hr className='border-none outline-none h-0.5 b w-3/5 m-auto bg-primary hidden' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-4'>
        {
          token && userData ? <div className='flex items-center gap-2 cursor-pointer group relative'>

            <p className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center'>{userData.name[0]}</p>
            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600
             z-20 hidden group-hover:block">
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/myblog')} className='hover:text-black cursor-pointer'>My Blogs</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div> : <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block' onClick={() => navigate('/login')}>Create Account</button>
        }
        <img className='w-6 cursor-pointer md:hidden' onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="menu" />

        {/* // mobile menu */}
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white translate-full`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="logo" />
            <img className='w-7' src={assets.cross_icon} alt="cross" onClick={() => setShowMenu(false)} />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 text-lg px-5 font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to={'/'}><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={'/mybolg'}><p className="px-4 py-2 rounded inline-block">My Blogs</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={'/myprofile'}><p className="px-4 py-2 rounded inline-block">My Profile</p></NavLink>

          </ul>
        </div>

      </div>
    </div>
  )
}

export default Navbar
