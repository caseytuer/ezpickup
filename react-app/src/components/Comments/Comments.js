import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getComments, createComment, updateComment, deleteComment } from "../../store/comment";
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
    const [editComment, setEditComment] = useState('')

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
        setComment('');
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

    const handleEdit = (e, comment) => {
        e.preventDefault();
        const editInput = document.getElementById(`edit-comment-input-field-${comment.id}`);
        editInput.hidden = false;
        const commentContent = document.getElementById(`comment-content-${comment.id}`);
        commentContent.hidden = true;
        const editCommentBtn = document.getElementById(`edit-comment-btn-${comment.id}`);
        editCommentBtn.hidden = true;
    }

    const handleEditSubmit = (e, comment) => {

        e.preventDefault();

        const payload = {
            id: comment.id,
            comment: editComment,
            user_id: userId,
            game_id: gameId
        }

        const editInput = document.getElementById(`edit-comment-input-field-${comment.id}`);
        editInput.hidden = true;
        const commentContent = document.getElementById(`comment-content-${comment.id}`);
        commentContent.hidden = false;
        const editCommentBtn = document.getElementById(`edit-comment-btn-${comment.id}`);
        editCommentBtn.hidden = false;

        setEditComment('');
        setErrors([]);
        dispatch(updateComment(payload))
            .then((data) => {
                if (data && data.id) {
                    history.push(`/games/${gameId}`);
                }
            }).catch(async (res) => {
                const data = res;
                if (data && data.errors) setErrors(data.errors);
            })

    }

    const handleDelete = (e, comment) => {
        e.preventDefault();
        dispatch(deleteComment(comment.id))
    }


    return (
        <div className="comments-container">
            <form onSubmit={handleSubmit}>
                <textarea
                placeholder="Leave a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                >
                </textarea>
                <button type="submit">Submit</button>
            </form>
            {commentsArr.map((comment) => 
            <div key={comment.id}
            className="comment-container">
                <div>
                    <img src={userAvatar} alt=""
                    className="comment-user-avatar"></img>
                    <div>{commentUser(comment)?.username}</div>
                </div>
                <div>
                    <button id={`edit-comment-btn-${comment.id}`} onClick={e => handleEdit(e, comment)}>Edit</button>
                    <button onClick={e => handleDelete(e, comment)}>Delete</button>
                    <form 
                        onSubmit={e => handleEditSubmit(e, comment)}
                        id={`edit-comment-input-field-${comment.id}`}
                        className="edit-comment-input-field"
                        hidden={true}
                        >
                        <textarea
                        placeholder={comment.comment}
                        onChange={e => setEditComment(e.target.value)}
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <div 
                        id={`comment-content-${comment.id}`}
                        className="comment-content">
                        {comment.comment}
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Comments;