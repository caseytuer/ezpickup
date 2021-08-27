import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllGames } from '../../store/game';
import UsersList from '../UsersList';
import Map from '../Map';
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
        const user = users?.find(user => user.id === id);
        return user?.username;
    }

    return (
        <>
            <div>
                <Map gamesArr={gamesArr}/>
            </div>
            <div className="games-container">
                {gamesArr.map((game, idx) => 
                <>
                    <div key={idx} className="game-container">
                        <div className="game-card-title">
                            <Link to={`/games/${game.id}`}>
                                {game.title}
                            </Link>
                        </div>
                        <div>
                            <span>what we're playing: </span>
                            <span className="game-answer">
                            {game.sport}
                            </span>
                        </div>
                        <div>
                            <span>who's hosting? </span>
                            <span className="game-answer">
                                {findGameCreatorUsername(game.creator_id)}
                            </span>
                        </div>
                        <div>
                            <span>time and date: </span>
                            <span className="game-answer">{game.start_time}</span>
                        </div>
                        <div>
                            <span>where at? </span>
                            <span className="game-answer">{game.address}, </span>
                            <span className="game-answer">{game.city}, </span>
                            <span className="game-answer">{game.state}</span>
                        </div>
                        <div>{game.description}</div>
                        <div>{game.equipment_needed}</div>
                    </div>
                </>    
                )}
            </div>
        </>
    )
}

export default Games;