"use client"
import Navbar from "@/components/Navbar";
import { toast } from 'react-hot-toast';

import axios from "axios"
import React, { useState ,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import LoadingSpinner from "@/components/LoadingSpinner";

const Stock = () => {
  const handleQuantityChange = async (id, type) => {
    try {
      const updateQuantity = await axios.put(
        "/api/updateQuantity",
        { id, type }
      );
      getProducts();
    } catch (e) {
      console.log(e);
    }
  };

  // const [loading, setLoading] = useState(false);

   const handleDelete=async(id)=>{
    console.log("i am clicked",id)
    try{
        const delOne=await axios.delete(`/api/deleteProduct?id=${id}`)
        getProducts()
        toast.success('product deleted successfully');
    }
    catch(e){
      console.log(e)
    }

   }
  const [searchProd,setSearchProd]=useState("");

  const handleSetSearch=(e)=>{
    setSearchProd(e.target.value)
  }

  const submitSearch=async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.get(`/api/search?q=${searchProd}`);
      console.log("jaya")
      console.log(response.data.prods)
      setGetData(response.data.prods)
      setSearchProd("")
    }
    catch(e){
      console.log(e)
    }
   

  }

  const handleAllProducts=()=>{
    getProducts()

  }

  const [addData,setAddData]=useState({"slug":"","price":"","quantity":""})
  const handleChange=(e)=>{
    setAddData((prev)=>({
      ...prev,
       [e.target.name]:e.target.value
    }))
  }
   const [getData,setGetData]=useState([])

  const getProducts =async()=>{

    try{
    const result=await axios.get("/api/getStock");
    console.log(result.data)
    setGetData(result.data.prods)
    }
    catch(e){
      console.log(e)
    }
   
  }

  useEffect(()=>{
    getProducts()
  },[])

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try{
     const ress=await axios.post("/api/addStock",addData);
     console.log(ress.data.message)
     getProducts()
     setAddData({"slug":"","price":"","quantity":""})
     toast.success('product added successfully');
    }
    catch(e){
      console.log(e)
    }
    
  }

  return (
    <div className="bg-[#EADBC8]">
           <Navbar/>
       
       
      
      <div className="m-10">
        <div className="text-2xl text-rose-950  font-medium cursor-pointer " onClick={handleAllProducts}>Add a product</div>
        <div>
          <form  onSubmit={handleSubmit}>
    <div className="form-group my-3 ">
      <label htmlFor ="exampleInputEmail1">Product Name</label>
      <input type="text" className="form-control bg-[#F1EEDC] " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter the product name" name="slug" value={addData.slug} onChange={handleChange}/>
    </div>
    <div class="form-group my-3">
      <label htmlFor ="exampleInputPassword1">Price</label>
      <input type="text" className="form-control bg-[#F1EEDC]" id="exampleInputPassword1" placeholder="enter the price" name="price" value={addData.price} onChange={handleChange}/>
    </div>
    <div class="form-group my-3">
      <label htmlFor ="exampleInputPassword1">Quantity</label>
      <input type="text" className="form-control bg-[#F1EEDC]" id="exampleInputPassword1" placeholder="enter the number of quantity" name="quantity" value={addData.quantity} onChange={handleChange}/>
    </div>
    <button type="submit" className="text-rose-950 hover:text-white border-2 border-rose-950 hover:bg-rose-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-1.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >Add</button>

    
          </form>
        </div>
      </div>

      <div className="mx-10 mt-10 pb-10 ">
        <div className="flex-col sm:flex-col lg:flex  justify-between items-start ">
         <div className="text-rose-950 text-2xl font-medium  mb-3 cursor-pointer" onClick={handleAllProducts}>All products</div>
         <div>
         <input type="text" name="searchProd"  value={searchProd} onChange={handleSetSearch} className="font-md mb-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="find a product"/>
         <button type="submit" onClick={submitSearch} className="text-rose-950 hover:text-white border-2 border-rose-950 hover:bg-rose-950 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-4 py-1.5 text-center me-2 mb-3 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
         >Search</button>
       </div>
       </div>
        <div>
        {/* {loading ? (
          <LoadingSpinner />
        ) : ( */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getData.map((row) => (
                <TableRow
                  key={row.slug}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                
                  <TableCell align="left">{row.slug}</TableCell>

                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">
                    <button className="h-5 w-7 bg-rose-950 rounded-xl text-white m-1" onClick={() => handleQuantityChange(row._id, "decrease")}
                    >-</button>
                    {row.quantity}
                    <button className="h-5 w-7 bg-rose-950 rounded-xl text-white m-1" onClick={() => handleQuantityChange(row._id, "increase")}
                    >+</button>
                    </TableCell>
                    
                    
                  <TableCell align="left">
                  <button type="button" className="close text-2xl" aria-label="Close" onClick={()=>handleDelete(row._id)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>





        </div>
      </div>
    </div>
  )
}
export default Stock
