const SET_PLAYERS = 'players/setPlayers';
const ADD_PLAYER = 'players/addPlayer';
const REMOVE_PLAYER = 'players/removePlayer';

const setPlayers = (players) => ({
    type: SET_PLAYERS,
    players,
})

// const addPlayer = (player) => ({
//     type: ADD_PLAYER,
//     player,
// })

const removePlayer = (player) => ({
    type: REMOVE_PLAYER,
    player,
})

export const getPlayers = (id) => async (dispatch) => {
    const response = await fetch(`/api/players/games/${id}`);

    if (response.ok) {
        const { players } = await response.json();
        dispatch(setPlayers(players))
        return players;
    } else {
        return ['An error occurred, please try again']
    }
};

export const createPlayer = (payload) => async (dispatch) => {
    const response = await fetch(`/api/players/games/${payload.game_id}`, {
        method: 'POST',
    });

    if (response.ok) {
        const { player } = await response.json();

        // const gameResponse = await fetch(`/api/games/${payload.game_id}`);
        // const game = await gameResponse.json();
        // await dispatch(getGame(game.id))
        await dispatch(getPlayers(payload.game_id))
        return player;
    } else {
        return ['An error occurred, please try again']
    }
}

export const deletePlayer = (id) => async (dispatch) => {
    const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const { player } = await response.json();

        await dispatch(removePlayer(player.id));
        return player;
    } else {
        return ['An error occurred, please try again']
    }
}

export default function reducer(state = {}, action) {
    let newState = { ...state };
    switch (action.type) {
        case SET_PLAYERS:
            action.players.forEach(player => {
                newState[player.id] = player
            });
            return newState;
        case ADD_PLAYER:
            newState[action.game_id] = action.player;
            return newState
        default:
            return newState;
    }
}