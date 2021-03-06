const SET_GAME = 'games/setGame';
const SET_ALL_GAMES = 'games/setAllGames';
const ADD_GAME = 'games/addGame';
const EDIT_GAME = 'games/editGame';
const REMOVE_GAME = 'games/removeGame'

const setGame = (game) => ({
    type: SET_GAME,
    game,
})

const setAllGames = (games) => ({
    type: SET_ALL_GAMES,
    games,
})

const addGame = (game) => ({
    type: ADD_GAME,
    game,
})

const editGame = (game) => ({
    type: EDIT_GAME,
    game,
})

const removeGame = (game) => ({
    type: REMOVE_GAME,
    game
})


export const getAllGames = () => async (dispatch) => {
    const response = await fetch(`/api/games/`)
    const data = await response.json();
    
    if (response.ok) {
        await dispatch(setAllGames(data.games));
        return response
    } else {
        return ['An error occurred, please try again']
    }
}


export const getGame = (id) => async (dispatch) => {
    const response = await fetch(`/api/games/${id}/`);
    const data = await response.json();

    if (response.ok) {
        await dispatch(setGame(data));
        return response
    } else {
        return ['An error occurred, please try again']
    }
}

export const createGame = (payload) => async (dispatch) => {
    const response = await fetch(`/api/games/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( payload ),
    });
    if (response.ok) {
        const game = await response.json();
        await dispatch(addGame(game));
        return game;
    } else if (response.status < 500) {
        const game = await response.json();
        if (game.errors) {
            return game.errors;
        }
    } else {
        return ['An error occurred, please try again']
    }
}

export const updateGame = (payload) => async (dispatch) => {
    const response = await fetch(`/api/games/${payload.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const game = await response.json();
        await dispatch(editGame(game));
        return game;
    } else if (response.status < 500) {
        const game = await response.json();
        if (game.errors) {
            return game.errors;
        }
    } else {
        return ['An error occurred, please try again']
    }
}

export const deleteGame = (id) => async (dispatch) => {
    const response = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        await dispatch(removeGame(id));
        return response
    } else {
        return ['An error occured, please try again']
    }
}

export default function reducer(state = {}, action) {
    let newState = {}
    switch (action.type) {
        case SET_GAME:
            newState[action.game.id] = action.game;
            return newState;
        case SET_ALL_GAMES:
            action.games.forEach(game => {
                newState[game.id] = game;
            });
            return { ...state, ...newState };
        case ADD_GAME:
            if (!state[action.game.id]) {
                newState = { ...state, [action.game.id]: action.game }
            }
            return newState;
        case EDIT_GAME:
            newState[action.game.id] = action.game;
            return newState;
        case REMOVE_GAME:
            newState = { ...state };
            delete newState[action.game];
            return newState;
        default:
            return state;
    }
}