import React, { useState } from 'react'
import Home from './Home'
import View from './View'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Register from '../components/Register';
import Login from '../components/Login';
import Bookmarks from '../components/Bookmarks';

function Base() {

    const location = useLocation();
    const isViewOrIdRoute = /^\/view\/[a-zA-Z0-9]+$/.test(location.pathname);
    const isRegisterRoute = /^\/register$/.test(location.pathname);
    const isLoginRoute = /^\/login$/.test(location.pathname);

  return (
    <>
        <Home/>
        {
           isViewOrIdRoute && (
                <>
                    <View/>
                </>
            )
        }
        {
          isRegisterRoute && (
            <Register/>
          )
        } 
        {
          isLoginRoute && (
            <Login/>
          )
        }
        <ToastContainer/>
    </>
  )
}

export default Base
