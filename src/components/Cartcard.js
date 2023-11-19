import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';

const Cartcard = ({item}) => {
    let dispatch = useDispatch();
  return (
    <div>
        {item.quantity>0 &&
        <>
        <div className='cardd'>
        <div style={{width:"50%",fontSize:"16px",fontWeight:"bold"}}>{item.name}</div>
        <div className="text-success px-4 py-1 fw-bold shadow border-none rounded" style={{width:"20%"}}>
              <span style={{cursor:"pointer"}} onClick={()=>dispatch(removeItem(item.id))} >-</span>
              <span className="px-2">{item.quantity}</span>
              <span style={{cursor:"pointer"}} onClick={()=>dispatch(addItem(item))} >+</span>
        </div>
        <div style={{width:"20%"}}>₹{Math.round(((item.price?item.price:item.defaultPrice)/100)*item.quantity)}</div>
        </div>
        </>
        }
        <br/>
    </div>
  )
}

export default Cartcard;