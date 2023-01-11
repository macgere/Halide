import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Navigate,
  useNavigate
} from "react-router-dom";
import './App.css';

const SignIn = ({setUserId}) => {
console.log(setUserId)
const navigate = useNavigate();
const [inputUserEmail, setInputUserEmail] = useState('');
const [inputUserPassword, setInputUserPassword] = useState('');


const GetUserBySignIn = (event) => {
    event.preventDefault()
    console.log('sup')
    return fetch(`https://localhost:7245/api/User/loggingInBy/email?email=${inputUserEmail}&password=${inputUserPassword}`)
    .then((response) => response.json())
    .then((response) => setUserId(response))
    .then(() => navigate('/home'))
}

const inputEmail = (event) => {
    setInputUserEmail(event.target.value)
}

const inputPassword = (event) => {
    setInputUserPassword(event.target.value)
}

 return (
     <>
         <h1>Sign In Below!</h1>
         <form>
             <label>
                 <div className='signIn'>
                     <input type="text" placeholder='Email' name="email" value={inputUserEmail} onChange={inputEmail} />
                     <input type="password" placeholder='Password' name="password" value={inputUserPassword} onChange={inputPassword} />
                 </div>
             </label>
             <button className='submit' text='Submit' onClick={(event) => GetUserBySignIn(event)}>Submit</button>
         </form>
     </>
 )
}

export default SignIn;