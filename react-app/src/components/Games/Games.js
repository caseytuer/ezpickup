import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllGames } from '../../store/game';
import './Games.css'

const Games = () => {
    
    const dispatch = useDispatch()
    const games = useSelector(state => state.game)

    let gamesArr = [];
    for (let key in games) {
        gamesArr.push(games[key])
    }
    

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])


    return (
        <div>
            {gamesArr.map((game, idx) => 
            <>
                <div key={idx} className="game-container">
                    <div>{game.title}</div>
                    <div>{game.sport}</div>
                    <div>{game.description}</div>
                </div>
            </>    
            )}
        </div>
    )
}

export default Games;