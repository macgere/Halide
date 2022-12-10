import { useState } from 'react';
import './App.css';

function App() {

const [reviews, setReviews] = useState([])

const getReviews = () => {
  fetch('https://localhost:7245/api/Review')
  .then((response) => response.json())
  .then((response) => setReviews(response))
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome To Halide</h1>
        <button className='signIn'>Sign In</button>
        <button className='signUp'>Sign Up</button>
        <button className='test' onClick={() => getReviews()}>See The Timeline</button>
        <div className='reviews'>
          {reviews.map((review) => <div key={review.id}>{review.filmTitle}</div>)}
        </div>
      </header>
    </div>
  );
}

export default App;
