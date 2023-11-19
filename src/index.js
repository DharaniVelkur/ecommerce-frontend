import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Error from './components/Error';
import Body from './components/Body';
import Restaurant from './components/Restaurant';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';


const router= createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
        {
            path:"/",
            element:<Body/>
        },
        {
            path:"/restaurant/:resid",
            element:<Restaurant/>
        },
        {
            path:"/cart",
            element:<Cart/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/register",
            element:<Register/>
        },{
            path:"/sendpasswordlink",
            element:<PasswordReset/>
        },
        {
            path:"/forgotpassword/:id/:token",
            element:<ForgotPassword/>
        }
    ],
    errorElement:<Error/>
    }
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
