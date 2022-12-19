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
import SubmitReview from './SubmitReview';

function Timeline({ userId, setReviewBeingRead }) {
    const navigate = useNavigate()
    console.log(userId)
    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState({})

    const noUserRedirect = () => {
        if (userId == 0) {
            navigate('/')
        }
    }

    noUserRedirect()

    const getReviews = () => {
        fetch('https://localhost:7245/api/Review')
            .then((response) => response.json())
            .then((response) => setReviews(response))
    }

    useEffect(() => {
        fetch(`https://localhost:7245/api/User/${userId}`)
            .then((response) => response.json())
            .then((response) => { setUser(response) })
        getReviews()
    }, [])

    const navigateToReview = (id) => {
        navigate('/review/')
        setReviewBeingRead(id)
    }

    const optionalDeleteButton = (id, reviewId) => {
        if (id == userId) {
            return <button className='navbarButton' onClick={() => deleteReview(reviewId)}>Delete Your Review</button>
        }
    }

    const deleteReview = (id) => {
        fetch(`https://localhost:7245/api/Review/${id}`, { method: 'DELETE' })
            .then(() => getReviews());
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="timelineUser">
                    <h3>{user.name}</h3>
                    <img className='profilePic' src={user.imageUrl} />
                </div>
                <div className='reviewSubmit'>
                    <SubmitReview userId={userId} getReviews={getReviews} />
                </div>
                <h2>Reviews By Halide Community:</h2>
                {reviews.map((review) =>
                    <div className='reviews'>
                        <div key={review.id}>
                            <div className='titleAndRating'>
                                <h1 className='filmTitle'>{review.filmTitle}</h1>
                                <h1 className='filmRating'>{review.filmRating}</h1>
                            </div>
                            <p className='dateTime'>{review.dateTime}</p>
                            <button className='navbarButton' onClick={() => navigateToReview(review.id)}>Full Review</button>
                            {optionalDeleteButton(review.userId, review.id)}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Timeline;