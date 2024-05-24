'use client'
import Cookies from "js-cookie";

import React from 'react'
import { useRouter } from 'next/navigation'; 
const Navbar = () => {
  const router = useRouter()
  const handleSubmit=()=>{
    router.push('/login');
  }
  const handlelogo=()=>{
    router.push('/');
  }
  const handleLogout = () => {
    localStorage.setItem("token", "");
    Cookies.remove("currentUser");

    router.push('/'); // Redirecting to login after logout
  };
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return (
    <div className='flex  items-center h-20 justify-between bg-[#F1EEDC] text-black px-5'>
      <div className=' text-rose-950 text-2xl font-medium cursor-pointer ' onClick={handlelogo}>MyStocks</div>
     {
      token ? (
         <div><button type="button" className="text-rose-950 hover:text-white border-2 border-rose-950 hover:bg-rose-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-1.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
         onClick={handleLogout}>Logout</button></div>
      )
      :(
        <div><button type="button" className="text-rose-950 hover:text-white border-2 border-rose-950 hover:bg-rose-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-1.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        onClick={handleSubmit}>Login</button></div>
      )
     }
      
    </div>
  )
}
export default Navbar
