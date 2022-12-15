import { useState, useEffect } from 'react';
import {
    useNavigate,
    useLocation,
    Link
} from 'react-router-dom'
import './App.css';

function UserProfile({userId}) {
    const [user, setUser] = useState({})
    const [reviews, setReviews] = useState([])
    console.log(user)

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

    return (
        <div className="userProfile">
            <header>
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <img className='profilePic' src={user.imageUrl} />
                <Link to="/home">Back to Timeline</Link>
                <div className='yourReviews'>
                    <h1>Your Reviews:</h1>
                    {reviews.map((review) =>
                        <div key={review.id}>
                            <h2 className='filmTitle'>{review.filmTitle}</h2>
                            <h3 className='filmRating'>{review.filmRating}</h3>
                            <p className='reviewBody'>{review.reviewBody}</p>
                            <p className='dateTime'>{review.dateTime}</p>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default UserProfile;