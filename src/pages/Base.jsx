import React from 'react'
import Home from './Home'
import View from './View'
import { useLocation } from 'react-router-dom'

function Base() {

    const location = useLocation();
    const isViewOrIdRoute = /^\/view\/[a-zA-Z0-9]+$/.test(location.pathname);

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
    </>
  )
}

export default Base
