import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../store/game';
import Map from '../Map';
import './Games.css'

const Games = () => {

    // const [users, setUsers] = useState([]);

    const dispatch = useDispatch()
    const games = useSelector(state => state.game)
    
    let gamesArr = [];
    for (let key in games) {
        gamesArr.push(games[key])
    }

    const skillLevel = ['none', 'Beginner', 'Intermediate', 'Advanced', 'All Skills Welcome']

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/users/');
    //         const responseData = await response.json();
    //         setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, [setUsers]);

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    // const findGameCreatorUsername = (id) => {
    //     const user = users?.find(user => user.id === id);
    //     return user?.username;
    // }

    const handleTime = (time) => {
        const militaryTime = time?.split(' ')[4]
        let hours = militaryTime?.split(':')[0]
        if (Number(hours) < 10) {
            hours = hours?.split('')[1]
            return `${hours}:${militaryTime?.split(':').slice(1, 2).join(':')}AM `
        } else if (Number(hours) < 12) {
            return `${militaryTime?.split(':').slice(0, 2).join(':')}AM `
        } else if (Number(hours) === 12) {
            return `${militaryTime?.split(':').slice(0, 2).join(':')}PM `
        } else {
            return `${hours % 12}:${militaryTime?.split(':').slice(1, 2).join(':')}PM `
        }
    }


    return (
        <>
            <div className="games-side-banner"/>
            <div className="games-page-canvas">
                <div className="map-container-games">
                    <Map className="games-map" gamesArr={gamesArr}/>
                </div>
                <div className="games-container">
                    {gamesArr.map((game, idx) => 
                        <div key={idx} className="game-container-wrapper">

                            <div className="game-container">
                                <div>
                                    <div className="game-card-title">
                                        <span>
                                        <Link to={`/games/${game.id}`}>
                                            {`${game.title}  `}
                                        </Link>
                                        </span>
                                        <span className="game-answer-sport">
                                        {game.sport}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="game-answer">{`📍${game.address}`}, </span>
                                        <span className="game-answer">{`${game.city}`}, </span>
                                        <span className="game-answer">{game.state}</span>
                                    </div>
                                    {/* <div>
                                        <span className="game-answer">
                                        {findGameCreatorUsername(game.creator_id)}
                                        </span>
                                    </div> */}
                                    <div>🏀 Equipment: {game.equipment_needed}</div>
                                    <div>{`⛹️‍♀️ ${skillLevel[game?.skill_level]}`}</div>
                                </div>
                                <div className="time-and-date-container">
                                    <div className="game-answer-date">
                                        {`${game?.start_time.split(' ')[2]} ${game?.start_time.split(' ')[1]}`}
                                    </div>
                                    <div className="game-answer-starttime">
                                        {handleTime(game.start_time)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Games;