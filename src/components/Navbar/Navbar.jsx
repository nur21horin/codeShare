import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navbar = () => {
  const {user,loading}=useAuth()
  return (
     <div className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">CP Platform</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/createpost">Create</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About</Link>
        <Link to="/help">Help</Link>
        <Link to="/contact">Contact</Link>
       {user ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
      </div>
    </div>
  )
}

export default Navbar
