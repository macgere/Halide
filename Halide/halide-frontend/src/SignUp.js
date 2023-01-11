import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import './App.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [inputUserEmail, setInputUserEmail] = useState('');
    const [inputUserPassword, setInputUserPassword] = useState('');
    const [inputUserName, setInputUserName] = useState('');

    const inputEmail = (event) => {
        setInputUserEmail(event.target.value)
    }
    
    const inputPassword = (event) => {
        setInputUserPassword(event.target.value)
    }

    const inputName = (event) => {
        setInputUserName(event.target.value)
    }

    const submitNewUser = () => {

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: inputUserName,
            email: inputUserEmail,
            password: inputUserPassword,
            dateTime: Date().toString(),
            imageUrl: 'https://thispersondoesnotexist.com/image'
          })
        }
    
        fetch('https://localhost:7245/api/User/newUser', requestOptions)
          .then(response => response.json())
          .then(navigate('/'))
      }

return (
    <>

        <h1>Sign In Below!</h1>

        <form>
            <label>
                <div className='signUp'>
                    <input type="text" placeholder='Name' name="email" value={inputUserName} onChange={inputName} />
                    <input type="text" placeholder='Email' name="email" value={inputUserEmail} onChange={inputEmail} />
                    <input type="password" placeholder='Choose A Password' name="password" value={inputUserPassword} onChange={inputPassword} />
                </div>
            </label>
            <button className='submit' text='Submit' onClick={() => submitNewUser()}>Submit</button>
        </form>
    </>
)
}

export default SignUp;