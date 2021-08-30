import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getComments, createComment, updateComment, deleteComment } from "../../store/comment";
import './Comments.css'
import userAvatar from '../../assets/images/user-avatar.png'
import { Link, useHistory } from "react-router-dom";
import trashIcon from '../../assets/images/trash-icon.png';
import trashIconYellow from '../../assets/images/trash-icon-yellow.png';
import penIcon from '../../assets/images/pen-icon.png';
import penIconYellow from '../../assets/images/pen-icon-yellow.png';

const Comments = ({ users }) => {

    const { gameId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment)
    const userId = useSelector((state) => state.session.user?.id);
    const user = useSelector(state => state.session.user)

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const [editComment, setEditComment] = useState('')

    let commentsArr;
    let allCommentsArr = [];
    for (let key in comments) {
        allCommentsArr.push(comments[key])
        commentsArr = allCommentsArr.filter(comment => comment.game_id === Number(gameId))
    }
    

    
    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])

    const commentUser = (comment) => {
        return users?.find(user => user.id === comment.user_id);
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

    const hoverTrashIcon = (comment) => {
        const trashCanIconComment = document?.getElementById(`delete-comment-btn-${comment?.id}`)
        trashCanIconComment.setAttribute('src', trashIconYellow)
    }

    const unHoverTrashIcon = (comment) => {
        const trashCanIconComment = document?.getElementById(`delete-comment-btn-${comment?.id}`)
        trashCanIconComment.setAttribute('src', trashIcon)
    }

    const hoverPenIcon = (comment) => {
        const penEditIconComment = document?.getElementById(`edit-comment-btn-${comment?.id}`)
        penEditIconComment.setAttribute('src', penIconYellow)
    }

    const unHoverPenIcon = (comment) => {
        const penEditIconComment = document?.getElementById(`edit-comment-btn-${comment?.id}`)
        penEditIconComment.setAttribute('src', penIcon)
    }


    return (
        <div className="comments-container">
            {!user && 
            <div className="comments-join-links">
                <Link className="comments-join-link" to="/login"> Login </Link>
                 or 
                <Link className="comments-join-link" to="signup"> Sign Up </Link>
                to Join the Conversation
            </div>
            }
            {user && <form onSubmit={handleSubmit}
            >
                <textarea
                className="add-comment-text-area"
                placeholder="Leave a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                >
                </textarea>
                <button 
                className="add-comment-submit-btn"
                type="submit">Submit</button>
            </form>}
            {commentsArr?.map((comment) => 
            <div key={comment.id}
            className="comment-container">
                <div>
                    <img src={userAvatar} alt=""
                    className="comment-user-avatar"></img>
                    <div>{commentUser(comment)?.username}</div>
                </div>
                <div>
                {comment.id === userId &&
                <>
                        <img 
                        onMouseOver={e => hoverTrashIcon(comment)}
                        onMouseOut={e => unHoverTrashIcon(comment)}
                        src={trashIcon}
                        alt=""
                        id={`delete-comment-btn-${comment?.id}`}
                        className="delete-comment-btn"
                        onClick={e => handleDelete(e, comment)}></img>
                        <img 
                        onMouseOver={e => hoverPenIcon(comment)}
                        onMouseOut={e => unHoverPenIcon(comment)}
                        src={penIcon}
                        alt=""
                        id={`edit-comment-btn-${comment?.id}`} 
                        className='edit-comment-btn'
                        onClick={e => handleEdit(e, comment)}></img>
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
                    </>}
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