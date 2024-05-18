"use client"
import Navbar from "@/components/Navbar";
import axios from "axios"
import React, { useState ,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Stock = () => {
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
    const result=await axios.get("http://localhost:3000/api/getStock");
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
     const ress=await axios.post("http://localhost:3000/api/addStock",addData);
     console.log(ress.data.message)
     getProducts()
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className="bg-[#EADBC8]">
           <Navbar/>

      <div className="m-10">
        <div className="text-2xl text-rose-950  font-medium  ">Add a product</div>
        <div>
          <form  onSubmit={handleSubmit}>
    <div className="form-group my-3">
      <label htmlFor ="exampleInputEmail1">Product Name</label>
      <input type="text" className="form-control bg-[#F1EEDC]" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter the product name" name="slug" value={addData.slug} onChange={handleChange}/>
    </div>
    <div class="form-group my-3">
      <label htmlFor ="exampleInputPassword1">Price</label>
      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="enter the price" name="price" value={addData.price} onChange={handleChange}/>
    </div>
    <div class="form-group my-3">
      <label htmlFor ="exampleInputPassword1">Quantity</label>
      <input type="text" className="form-control" id="exampleInputPassword1" placeholder="enter the number of quantity" name="quantity" value={addData.quantity} onChange={handleChange}/>
    </div>
  
    <button type="submit" className="btn btn-primary">Add product</button>
          </form>
        </div>
      </div>

      <div className="m-10">
        <div className="text-rose-950 text-2xl font-medium  mb-3">All products</div>
        <div>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
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
              <TableCell align="left">{row.quantity}</TableCell>
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
