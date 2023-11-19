import React from 'react'
import { useNavigate } from 'react-router-dom'

const Emptycart = () => {
    let navigate=useNavigate();
  return (
    <div className='text-center'>
    <img src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0' alt='emptycart' width={"30%"} />
    <h1 className='fw-bold'>Your cart is empty</h1>
    <p style={{color:"GrayText"}}>You can go to home page to view more restaurants</p>
    <button className='btn fw-bold text-white' onClick={()=>navigate('/')} style={{backgroundColor:"orange"}} >SEE RESTAURANTS NEAR YOU</button>
        </div>
  )
}

export default Emptycart