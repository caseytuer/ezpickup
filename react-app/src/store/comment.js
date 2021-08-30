const SET_COMMENT = 'comments/setComment';
const SET_COMMENTS = 'comments/setComments';
const ADD_COMMENT = 'comments/addComment';

const setComment = (comment) => ({
    type: SET_COMMENT,
    comment,
})

const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments,
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const getComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}/`);
    const data = await response.json();

    if (response.ok) {
        await dispatch(setComment(data));
        return response
    } else {
        return ['An error occured, please try again']
    }
}

export const getComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`)
    const data = await response.json();

    if (response.ok) {
        await dispatch(setComments(data.comments));
        return response;
    } else {
        return ['An error occured, please try agan']
    }
}

export const createComment = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comments/games/${payload.game_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const comment = await response.json();
        await dispatch(addComment(comment));
        return comment
    } else {
        return ['An error has occured, please try again']
    }
}

export default function reducer(state = {}, action) {
    let newState = {}
    switch (action.type) {
        case SET_COMMENT:
            newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        case SET_COMMENTS:
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            return { ...state, ...newState }
        case ADD_COMMENT:
            newState = { ...state };
            if (!state[action.comment.id]) {
                newState = { ...state, [action.comment.id]: action.comment}
            }
            return newState;
        default:
            return state;
    }
}