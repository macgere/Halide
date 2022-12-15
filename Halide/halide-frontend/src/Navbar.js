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

const resetUser = () => {
    setUserId(0)
}

return(
    <>
    <div className='navbar'>
    <Link to="/" className="navbarButton" onClick={() => resetUser()}>{signInSignOutText()}</Link>
    <Link to='/signUp' className='navbarButton'>Sign Up</Link>
    <Link to='/userProfile' className='navbarButton'>User Profile</Link>
    </div>
    </>
)


}

export default Navbar;