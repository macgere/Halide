import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

const SubmitReview = ({userId, getReviews}) => {
   const [newReviewTitle, setNewReviewTitle] = useState('')
   const [newReviewRating, setNewReviewRating] = useState(0)
   const [newReviewBody, setNewReviewBody] = useState('')

   let user = userId

   let commentDate = Date().toString()


  const submitNewReview = (e) => {
    let testObject = {
      filmTitle: newReviewTitle,
      filmRating: newReviewRating,
      reviewBody: newReviewBody,
      dateTime: commentDate,
      userId: user
     }
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testObject)
    }

    fetch(`https://localhost:7245/api/Review/newReview/`, requestOptions)
      // .then(response => response.json())
      .then(() => getReviews())
  }

  return (
    <>
    <div className='reviewSubmit'>
      <ul>
        <div className='titleAndRating'>
          <li>
            <input type="text" placeholder='Film Title' onChange={(event) => setNewReviewTitle(event.target.value)} />
          </li>
          <li>
            <input type="number" placeholder='?/10' min="1" max="10" onChange={(event) => setNewReviewRating(event.target.value)} />
          </li>
        </div>
        <li>
          <textarea className='reviewBody' placeholder='The viewing public awaits your critique' type="text" onChange={(e) => setNewReviewBody(e.target.value)} />
        </li>
      </ul>
    </div>
    <button onClick={(e) => submitNewReview(e)}>SubmitReview</button>
    </>
      )
}

export default SubmitReview;