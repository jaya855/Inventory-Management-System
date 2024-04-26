'use client'
import React from 'react'
import { useRouter } from 'next/navigation'; 
const Navbar = () => {
  const router = useRouter()
  const handleSubmit=()=>{
    router.push('/login');

  }
  return (
    <div className='flex  items-center h-20 justify-between bg-[#F1EEDC] text-black px-5'>
      <div className=' text-rose-950 text-2xl font-medium  '>MyStocks</div>
      
      
      <div><button type="button" className="text-rose-950 hover:text-white border-2 border-rose-950 hover:bg-rose-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-1.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      onClick={handleSubmit}>Login</button>

     
      </div>

    </div>
  )
}

export default Navbar
