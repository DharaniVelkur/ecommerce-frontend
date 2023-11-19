import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
import { CircularProgress } from '@mui/material';


const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setCpassword] = useState("");
    const [spin,setSpin] =useState(false);

    const handleregister =async (e)=>{
        e.preventDefault();
        setSpin(true);
        const register = await fetch("https://ecommerce-backend-t6kq.onrender.com/register",{
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                cpassword: cpassword
            })
        });
        const response = await register.json();
        if(response.status===200){
          setSpin(false);
            toast.success('user registration done');
            setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
        } else {
          setSpin(false);
        toast.error(response.error);
        setName("");
        setPassword("");
        setCpassword("");
        setEmail("");
        }
    }
  return (
    <div className='pt-4'>
    <div className='form'>
      <label className='label' htmlFor='name'>Name :</label>
      <input className='input' type="text" id='name' placeholder='Enter name' value={name} onChange={e=>setName(e.target.value)}/><br/>
      <label className='label' htmlFor='Email'>Email :</label>
      <input className='input' type="email" id='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}/><br/>
      <label className='label' htmlFor='password'>Password :</label>
      <input className='input' type="password" id='password' placeholder='Enter password' value={password} onChange={e=>setPassword(e.target.value)}/><br/>
      <label className='label' htmlFor='cpass'>Confirm password :</label>
      <input className='input' type="password" id='cpass' placeholder='Confirm Password' value={cpassword} onChange={e=>setCpassword(e.target.value)}/><br/>
     {spin ? <button className='btn button btn-primary'><CircularProgress size={"1rem"}/></button> :
      <button className='btn button btn-primary' onClick={handleregister}>Register</button>}
      <p className='p'>Already have an account?<Link className='a' to={"/login"}>Login</Link></p>
      <ToastContainer/>
    </div>
    </div>
  )
}

export default Register;
