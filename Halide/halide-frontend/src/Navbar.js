import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const Navbar = ({userId, setUserId}) => {

const signInSignOutText = () => {
    if (userId == 0) {
        return "Sign In"
    } else {
        return "Sign Out"
    }
}    

const dynamicTimeline = () => {
    if (userId == 0) {
        return ""
    } else {
        return <Link to='/home' className='navbarButton'>Home</Link> 
    }
}

const dynamicUserProfile = () => {
    if (userId == 0) {
        return ""
    } else {
        return <Link to='/userProfile' className='navbarButton'>Profile</Link> 
    }
}

const dynamicSignUp = () => {
    if (userId == 0) {
        return <Link to='/signUp' className='navbarButton'>Sign Up</Link>
    } else {
        return "" 
    }
}

const resetUser = () => {
    setUserId(0)
}

return(
    <>
        <div className='navbar'>
            <Link to="/" className="navbarButton" onClick={() => resetUser()}>{signInSignOutText()}</Link>
            {dynamicSignUp()}
            {dynamicUserProfile()}
            {dynamicTimeline()}
        </div>
    </>
)


}

export default Navbar;