import React, { useState } from 'react'
import "../styles/navbar.css";
import bookmark from '../assets/bookmark.png'
import burger from '../assets/burger.png'
import SignIn from './SignIn';

function Navbar({ user,setUser}) {

    const [visible,setVisible] = useState(false)
    const [signInVisible,setSignInVisible] = useState(false)

    const handleLogoutClick = ()=>{
        setVisible(!visible)
    }

    const handleSignInClick = ()=>{
      setSignInVisible(!signInVisible)
    }

    return (
      <>
        <div className="navbar">
          {user === null ? (
            <>
              <div className="pill" id="register">
                Register Now
              </div>
              <div className="pill" id="sign-in" onClick={()=>{handleSignInClick()}}>
                Sign in
              </div>
              {
                signInVisible && <SignIn/>
              }
            </>
          ) : (
            <>
                <div className='pill' id='register'>
                    <img src={bookmark} alt='bookmark'/>
                    Bookmark
                </div>
                <div className='pill' id='register'>
                    Add story
                </div>
                <img src={user.portfolio} alt='userPort' className='userPort'/>
                <img src={burger} alt='burger' className='burger' style={{width:18, height:12,marginRight:31}} onClick={handleLogoutClick}/>

                {
                    visible?<div className='logoutDiv'>
                        {
                            user.name
                        }
                        <div className='pill' id='register' onClick={()=>{setUser(null)}}>
                            Logout
                        </div>
                    </div>:<>

                    </>
                }
            </>
          )}
        </div>
      </>
    );
}

export default Navbar
