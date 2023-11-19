import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [spin,setSpin] =useState(false);
    let navigate= useNavigate();

    const validuser = async () => {
        let token =localStorage.getItem("tokenofuser");
        const response =await fetch('http://localhost:8000/validuser',{
          method: 'GET',
          headers:{
            Authorization:token,
            "ACCESS-CONTROL-ALLOW-ORIGIN":true,
            "Content-Type":"application/json"
          }
        });
        let result =await response.json();
        if(result.status===200){
          navigate('/');
        } else {
          navigate('/login');
        }
      }

      useEffect(()=>{
        validuser();
      },[])
    
    const handlelogin =async () =>{
        setSpin(true);
        const login = await fetch('http://localhost:8000/login',{
            method: 'POST',
            headers:{
                "ACCESS-CONTROL-ALLOW-ORIGIN":true,
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        });
        const response =await login.json();
        if(response.status===200){
            setSpin(false);
            toast.success("Login successful");
            localStorage.setItem("tokenofuser",response.result.token);
            localStorage.setItem('resultofuser',JSON.stringify(response.result.uservalid));
            navigate('/');
        } else {
            setSpin(false);
            toast.error(response.error);
            setEmail("");
            setPassword("");
        }
    }
  return (
    <div className='pt-5'>
    <div className='form '>
    <label className='label' htmlFor='email'>Email: </label>
    <input type='email' className='input' id='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Enter email'/>
    <br/>
    <label className='label' htmlFor='password'>Password: </label>
    <input type='password' className='input' id='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Enter password'/>
    {spin ?  <button className='btn button btn-primary'><CircularProgress size={"1rem"} /></button>:
    <button className='btn button btn-primary' onClick={handlelogin}>Login</button>}
    <p className='p'>Don't have an account?<Link className='a' to={"/register"}>Register</Link></p>
    <p className='p'>Forgot Password?<Link to={"/sendpasswordlink"} className='a'>Click Here</Link></p>
    <ToastContainer/>
    </div>
    </div>
  )
}

export default Login;