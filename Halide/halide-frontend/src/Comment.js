import { useEffect, useState } from 'react';
import './App.css';

const Comment = ({comment}) => {
    const userId = comment.userId
    const [commentAuthor, setCommentAuthor] = useState({})

    useEffect( () => {
        getCommentAuthor(userId)
    }, [])

    const getCommentAuthor = (userId) => {
          fetch(`https://localhost:7245/api/User/${userId}`)
            .then((response) => (response.json()))
            .then((response) => setCommentAuthor(response))
        }
    
return (
    <>
    <div className='fullReviewComment'>
            <div key={comment.id}>
                <h3 className='commenter'>{commentAuthor.name}</h3>
                <h2 className='commentBody'>{comment.commentBody}</h2>
                <h3 className='commentDate'>{comment.dateTime}</h3>
            </div>
    </div>
    </>
)

}

export default Comment;