import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function Header() {

  const location = useLocation();

  const checkLink = (pathName)=>{
    if(location.pathname===pathName){
      return "border-b-red-400";
    }
  };
  
  return (
  <nav className='m-2 p-3 rounded-2xl bg-gray-800 border-gray-700'>
    <div className='container flex flex-wrap justify-between items-center mx-auto'>
      <Link className='flex items-center' to="/">
      <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
      <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Groceries</span>
      </Link>
      <div className='w-full md:block md:w-auto'>
        <ul className='text-white flex space-x-2 items-center justify-end'>
          <Link to="/">
          <li className= {`border-gray-600 border-solid border-2  rounded-xl px-2 py-1 text-lg ${checkLink("/")}`} >Home</li></Link>
          <Link to="/login">
          <li className={`border-gray-600 border-solid border-2  rounded-xl px-2 py-1 text-lg ${checkLink("/login")}`} >Login</li></Link>
          <Link to="/register">
          <li className={`border-gray-600 border-solid border-2  rounded-xl px-2 py-1 text-lg ${checkLink("/register")}`} >Register</li></Link>
        </ul>
      </div>
    </div>
  </nav>
  )
}
