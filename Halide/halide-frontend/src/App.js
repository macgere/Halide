import { useState } from 'react';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import Timeline from './Timeline.js';
import Navbar from './Navbar.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import UserProfile from './UserProfile.js';
import Review from './Review.js'

function App() {

  const [userId, setUserId] = useState(0)
  const [reviewBeingRead, setReviewBeingRead] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Navbar userId={userId} setUserId={setUserId} />
          <Routes>
            <Route path="/" element={<SignIn setUserId={setUserId} />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route exact path="/home" element={<Timeline userId={userId} setReviewBeingRead={setReviewBeingRead}/>} />
            <Route path="/userProfile" element={<UserProfile userId={userId} />} />
            <Route path="/review" element={<Review reviewBeingRead={reviewBeingRead} userId={userId}/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
