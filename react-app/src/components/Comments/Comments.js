import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getComments, createComment } from "../../store/comment";
import './Comments.css'
import userAvatar from '../../assets/images/user-avatar.png'
import { useHistory } from "react-router-dom";

const Comments = ({ users }) => {

    const { gameId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment)
    const userId = useSelector((state) => state.session.user?.id);

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    let commentsArr = [];
    for (let key in comments) {
        commentsArr.push(comments[key])
    }

    
    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])

    const commentUser = (comment) => {
        return users.find(user => user.id === comment.user_id);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            comment: comment,
            user_id: userId,
            game_id: gameId
        }
        setErrors([]);
        dispatch(createComment(payload))
        .then( (data) => {
            if (data && data.id) {
                history.push(`/games/${gameId}`);
            }
        }).catch(async(res) => {
            const data = res;
            if (data && data.errors) setErrors(data.errors);
        })
        
    }


    return (
        <div className="comments-container">
            <form onSubmit={handleSubmit}>
                <input
                placeholder="Leave a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                >
                </input>
                <button type="submit">Submit</button>
            </form>
            {commentsArr.map((comment, idx) => 
            <>
            <div className="comment-container">
                <div>
                    <img src={userAvatar} alt=""
                    className="comment-user-avatar"></img>
                    <div>{commentUser(comment)?.username}</div>
                </div>
                <div key={idx}>
                {comment.comment}
                </div>
            </div>
            </>
            )}
        </div>
    )
}

export default Comments;