import { useEffect, useState } from 'react';
import './App.css';
import Comment from './Comment';

const Review = ({reviewBeingRead, userId}) => {

    const [fullReview, setFullReview] = useState({});
    const [author, setAuthor] = useState({});
    const [comments, setComments] = useState([])
    const [newCommentBody, setNewCommentBody] = useState('')

    let authorId = fullReview.userId
    console.log('the User Id is ' + userId)

    useEffect( () => {
        getFullReview()
    }, [])

    useEffect( () => {
        reviewAuthor()
        .then(() => getComments())
    }, [fullReview])

    const getFullReview = async() => {
        return await fetch(`https://localhost:7245/api/Review/${reviewBeingRead}`)
        .then((response) => response.json())
        .then((response) => setFullReview(response))
    }

    const reviewAuthor = async() => {
        await  fetch(`https://localhost:7245/api/User/${authorId}`)
        .then((response) => (response.json()))
        .then((response) => setAuthor(response))
    }

    const getComments = () => {
        fetch(`https://localhost:7245/api/Comment/byReviewId/${reviewBeingRead}`)
            .then((response) => (response.json()))
            .then((response) => setComments(response))
    }

    const submitComment = () => {
        let user = userId
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                commentBody: newCommentBody,
                reviewId: reviewBeingRead,
                dateTime: Date().toString(),
                userId: user
              })
            }
            fetch('https://localhost:7245/api/Comment', requestOptions)
              .then(() => getComments())
          }

return (
    <>
    <div className='fullReview'>
            <div className='titleAndRating'>
                <h1>{fullReview.filmTitle}</h1>
                <h1>{fullReview.filmRating}/10</h1>
            </div>
            <p>{fullReview.reviewBody}</p>
            <p>{fullReview.dateTime}</p>
            <p>{author.name}</p>
    </div>
    <div className='fullReviewComments'>
        {comments.map(comment => <Comment reviewBeingRead={reviewBeingRead} comment={comment} setComments={setComments}/>)}
        <div className='submitComment'>
            <textarea type="text" className='inputComment' placeholder='Post a comment' onChange={(e) => setNewCommentBody(e.target.value)}/> 
            <button onClick={() => submitComment()}>Send</button>
        </div>
    </div>
    </>
)

}

export default Review;