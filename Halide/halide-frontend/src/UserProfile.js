import { useState, useEffect } from 'react';
import {
    useNavigate,
    useLocation,
    Link
} from 'react-router-dom'
import SubmitReview from './SubmitReview';
import './App.css';

function UserProfile({userId, setReviewBeingRead}) {
    const [user, setUser] = useState({})
    const [reviews, setReviews] = useState([])
    console.log(user)
    const navigate = useNavigate()

    const getReviewsByUserId = (userId) => {
        fetch(`https://localhost:7245/api/User/reviewsBy/${userId}`)
            .then((response) => response.json())
            .then((response) => setReviews(response))
    }

useEffect(() => {
        fetch(`https://localhost:7245/api/User/${userId}`)
            .then((response) => response.json())
            .then((response) => {setUser(response)})
        getReviewsByUserId(userId)    
}, [])

const deleteReview = (id) => {
    fetch(`https://localhost:7245/api/Review/${id}`, { method: 'DELETE' })
        .then(() => getReviews());
}

const navigateToReview = (id) => {
    navigate('/review/')
    setReviewBeingRead(id)
}

    return (
        <div className="userProfile">
            <header>
                <div className='timelineUser'>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <img className='profilePic' src={user.imageUrl} />
                </div>
                <div className='reviewSubmit'>
                    <SubmitReview userId={userId} />
                </div>
                <div>
                    <h1>Your Reviews:</h1>
                    {reviews.map((review) =>
                        
                        <div className='fullReview' key={review.id}>
                            <div className='titleAndRating'>
                                <h1 className='filmTitle'>{review.filmTitle}</h1>
                                <h1 className='filmRating'>{review.filmRating}</h1>
                            </div>
                            <p className='dateTime'>{review.dateTime}</p>
                            <button className='navbarButton' onClick={() => navigateToReview(review.id)}>Full Review</button>
                            <button className='navbarButton' onClick={() => deleteReview(review.id)}>Delete Your Review</button>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default UserProfile;