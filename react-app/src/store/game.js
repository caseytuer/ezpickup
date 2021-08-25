const SET_GAME = 'games/setGames';
const SET_ALL_GAMES = 'games/setAllGames'

const setGame = (game) => ({
    type: SET_GAME,
    game,
})

const setAllGames = (games) => ({
    type: SET_ALL_GAMES,
    games
})

export const getGame = (id) => async (dispatch) => {
    const response = await fetch(`/api/games/${id}`);
    const data = await response.json();

    if (response.ok) {
        await dispatch(setGame(data));
        return response
    } else {
        return ['An error occurred, please try again']
    }
}

export const getAllGames = () => async (dispatch) => {
    const response = await fetch(`/api/games`)
    const data = await response.json();

    if (response.ok) {
        await dispatch(setAllGames(data.games));
        return response
    } else {
        return ['An error occurred, please try again']
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
        default:
            return state;
    }
}