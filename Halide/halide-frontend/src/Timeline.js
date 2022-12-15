import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import './App.css';
// import UserBasic from './UserBasic';
import SubmitReview from './SubmitReview';

function Timeline({userId, setReviewBeingRead}) {
const navigate = useNavigate()
console.log(userId)
const [reviews, setReviews] = useState([])
const [user, setUser] = useState({})


const getReviews = () => {
  fetch('https://localhost:7245/api/Review')
  .then((response) => response.json())
  .then((response) => setReviews(response))
}

useEffect(() => {
        fetch(`https://localhost:7245/api/User/${userId}`)
            .then((response) => response.json())
            .then((response) => {setUser(response)})
        getReviews()
}, [])

const navigateToUserProfile = () => {
    navigate('/userProfile')
}

// let id = review.id

const navigateToReview= (id) => {
    navigate('/review/')
    setReviewBeingRead(id)
}

  return (
      <div className="App">
          <header className="App-header">
              <h1>Halide</h1>
              <button className='navbarButton' onClick={() => navigateToUserProfile()}>Your Profile</button>
              {/* <UserBasic user={user} /> */}
              <div className="userProfile">
                      <p>{user.name}</p>
                      <img className='profilePic' src={user.imageUrl} />
              </div>
              <div className='reviewSubmit'>
                <SubmitReview userId={userId} />
              </div>
              <div className='reviews'>
                <h2>Reviews By Halide Community:</h2>
                  {reviews.map((review) =>
                      <div key={review.id}>
                          <h2 className='filmTitle'>{review.filmTitle}</h2>
                          <h3 className='filmRating'>{review.filmRating}</h3>
                          <p className='dateTime'>{review.dateTime}</p>
                          <button className='navbarButton' onClick={() => navigateToReview(review.id)}>SeeFullReview</button> 
                      </div>
                  )}
              </div>
          </header>
      </div>
  );
}

export default Timeline;