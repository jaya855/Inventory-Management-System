'use client'
import React from 'react';
import { useState } from 'react';
import  Link  from 'next/link';
import { useRouter } from 'next/navigation'; 
import Navbar from '@/components/Navbar';



const Login = () => {
  const router = useRouter()
  const [formData,setFormData]=useState({username:"",password:""})

  const handleChange=(e)=>{
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value

    }));
  }
  const submitHandler=()=>{
    router.push('/stocks')
  }
  return (
    <div>
    <Navbar/>
    <div className="flex justify-center items-center my-[10rem]">
      <form className="bg-[#F1EEDC] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-2xl font-bold mb-4 text-rose-950">Login</h2>
        <div className="mb-4">
          <label className="block text-rose-950 text-sm font-bold mb-2" htmlFor="username">
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder='enter your username'
            required
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-rose-950 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder='enter your password'
            required
            name="password"
            
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-rose-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onSubmit={submitHandler}
          >
            Login
          </button>
           <Link href="/signup" className="text-sm text-gray-600 hover:underline">
            Not registered? Sign up here.
          </Link> 
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;