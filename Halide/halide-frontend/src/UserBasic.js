import { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useLocation
// } from "react-router-dom";
import './App.css';

function UserBasic({user}) {

  console.log(user)

  return (
    <div className="userProfile">
      <header>
        <p>{user.name}</p>
        <img className='profilePic' src={user.imageUrl}/>
      </header>
    </div>
  );
}

export default UserBasic;