import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cartcard from "./Cartcard";
import {useNavigate} from 'react-router-dom';
import { clearCart } from "../utils/cartSlice";
import Emptycart from "./Emptycart";

const Cart = () => {
  let navigate=useNavigate();
  let dispatch=useDispatch();

  const [isChecked, setChecked] = useState(false);

  let cartItems = useSelector((store) => store.cart.items);
  const handlegoback =()=>{
    navigate(-1);
  }

  const validuser = async () => {
    let token =localStorage.getItem("tokenofuser");
    const response =await fetch('https://ecommerce-backend-t6kq.onrender.com/validuser',{
      method: 'GET',
      headers:{
        Authorization:token,
        "ACCESS-CONTROL-ALLOW-ORIGIN":true,
        "Content-Type":"application/json"
      }
    });
    let result =await response.json();
    if(result.status===200){
      localStorage.setItem('resultofuser',JSON.stringify(result.validuserone));

      navigate('/cart');
    } else {
      navigate('/login');
    }
  }

  useEffect(()=>{
    validuser();
  },[])

  return (
    cartItems?.length > 0 ? (
    <div className="d-flex justify-content-center p-3">
    <div className="p-3" style={{backgroundColor:"#E5E5E5",width:"60vw"}}>
      <div className="d-flex justify-content-between py-3">
      <button className="btn btn-info text-white"onClick={handlegoback}>Back</button>
      <button className="btn" onClick={()=>{dispatch(clearCart())}} style={{backgroundColor:"orange",color:"whitesmoke"}}>Clear Cart</button>
      </div>
     <div className="bg-white shadow pt-3">{cartItems?.map((item) => (
        <Cartcard item={item} />
      ))}
      </div> <br/>
     
        <>
          <input className="px-2 rounded" placeholder="Any suggestions? We will pass.." style={{width:"100%",height:"50px",border:"none"}}/>
          <br/><br/>
          <div className="border">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          
          <label className="px-2 fw-bold">Opt in for No-contact Delivery</label>
          {!isChecked ? (
            <div>
              Unwell, or avoiding contact? Please select no-contact delivery.
              Partner will safely place the order outside your door (not for
              COD)
            </div>
          ) : (
            <div>
              Our delivery partner will call to confirm. Please ensure that your
              address has all the required details.
            </div>
          )}
          </div>
<br/>
      <p className="fw-bold">Bill Details</p>
      <div className="d-flex justify-content-between" style={{color:"GrayText"}}>
        <p >Item Total</p>
        <p>₹{cartItems?.map(e=>(e.price?e.price:e.defaultPrice)*e.quantity/100)?.reduce((a,b)=>a+b)}</p>
      </div>
      <div className="d-flex justify-content-between" style={{color:"GrayText"}}>
        <p >Delivery Fee</p>
        <p>₹50</p>
      </div>
      <div className="d-flex justify-content-between" style={{color:"GrayText"}}>
        <p>GST and Restaurant Charges</p>
        <p>₹56</p>
      </div>
      <hr/>
      <div className="d-flex justify-content-between fw-bold" style={{fontSize:"20px"}}>
        <p>TO PAY</p>
        <p>₹{cartItems?.map(e=>(e.price?e.price:e.defaultPrice)*e.quantity/100)?.reduce((a,b)=>a+b)+50+56}</p>
      </div>
      <div className="border bg-white p-3 text-center">
      <h6>Review your order and address details to avoid cancellations</h6>
      <span className="text-danger">Note:</span><span> If you cancel within 60 seconds of placing your order, a 100% refund will be issued. No refund for cancellations made after 60 seconds.</span>
      <p>Avoid cancellation as it leads to food wastage.</p>
      <p className="text-danger" style={{textDecoration:"underLine",cursor:"pointer"}}>Read Cancellation policy</p>
    </div>
        </>
    </div>
    </div>
     ) : <Emptycart/>
     
  );
};

export default Cart;
