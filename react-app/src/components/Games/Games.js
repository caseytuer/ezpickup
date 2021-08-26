import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllGames } from '../../store/game';
import UsersList from '../UsersList';
import './Games.css'

const Games = () => {

    const [users, setUsers] = useState([]);

    const dispatch = useDispatch()
    const games = useSelector(state => state.game)
    
    let gamesArr = [];
    for (let key in games) {
        gamesArr.push(games[key])
    }

    console.log(users)
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    const findGameCreatorUsername = (id) => {
        const user = users.find(user => user.id === id);
        return user?.username;
    }

    return (
        <div>
            {gamesArr.map((game, idx) => 
            <>
                <div key={idx} className="game-container">
                    <div className="game-card-title">
                        <Link to={`/games/${game.id}`}>
                            {game.title}
                        </Link>
                    </div>
                    <div>{game.sport}</div>
                    <div>{findGameCreatorUsername(game.creator_id)}</div>
                    <div>{game.description}</div>
                    <div>{game.equipment_needed}</div>
                </div>
            </>    
            )}
        </div>
    )
}

export default Games;