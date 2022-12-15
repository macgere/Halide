import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const SubmitReview = ({userId}) => {
   const [newReviewTitle, setNewReviewTitle] = useState('')
   const [newReviewRating, setNewReviewRating] = useState(0)
   const [newReviewBody, setNewReviewBody] = useState('')

   let user = userId

   let commentDate = Date().toString()

  const submitNewReview = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filmTitle: newReviewTitle,
        filmRating: newReviewRating,
        reviewBody: newReviewBody,
        dateTime: commentDate,
        userId: user
      })
    }

    fetch('https://localhost:7245/api/Review/newReview', requestOptions)
      .then(response => response.json())
      .then((response) => setReviews(...reviews, response))
  }

  return (
      <div className='reviewSubmit'>
      <h2>Submit a New Review:</h2>
      <ul>
        <li>
          <p>Film Title</p>
          <input type="text" onChange={(event) => setNewReviewTitle(event.target.value)} />
        </li>
        <li>
          <p>Film Rating</p>
          <input type="number" min="1" max="10" onChange={(event) => setNewReviewRating(event.target.value)}/>
        </li>
        <li>
          <p>Your Review</p>
          <input className='reviewBody' type="text" onChange={(e) => setNewReviewBody(e.target.value)} />
        </li>
      </ul>
      <button onClick={() => submitNewReview()}>SubmitReview</button>
    </div>
      )
}

export default SubmitReview;