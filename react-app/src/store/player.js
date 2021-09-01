const SET_PLAYER = 'players/setPlayer';

const setPlayer = (player) => ({
    type: SET_PLAYER,
    player,
})

export const getPlayer = (id) => async (dispatch) => {
    const response = await fetch(`/api/players/`)
}