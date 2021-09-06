import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../store/game';
import Map from '../Map';
import './Games.css'

const Games = () => {

    const [users] = useState([]);

    const dispatch = useDispatch()
    const games = useSelector(state => state.game)
    
    let gamesArr = [];
    for (let key in games) {
        gamesArr.push(games[key])
    }

    const skillLevel = ['none', 'Beginner', 'Intermediate', 'Advanced', 'All Skills Welcome']


    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    const findGameCreatorUsername = (id) => {
        const user = users?.find(user => user.id === id);
        return user?.username;
    }

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
                    <div className="title-message">Find Games</div>
                    {gamesArr.map((game, idx) => 
                        <div key={idx} className="game-container-wrapper">

                            <Link className="game-container"
                                to={`/games/${game.id}`}>
                                <div className="title-top-div">
                                    <div className="game-card-title">
                                        <span>
                                        <div >
                                            {`${idx+1}. ${game.title}  `}
                                        </div>
                                        </span>
                                        <span className="game-answer-sport">
                                        {game.sport}
                                        </span>
                                    </div>

                                </div>
                                <div className="title-middle-div">
                                <div className="title-middle-address"
                                >
                                    <div className="games-info">
                                        <span className="game-answer">
                                                <i class="fas fa-map-marked-alt games-icon">
                                                </i>
                                            {` ${game.address},`} </span>
                                        <span className="game-answer">{`${game.city}`}, </span>
                                        <span className="game-answer">{game.state}</span>
                                    </div>
                                    {/* <div>
                                        <span className="game-answer">
                                        {findGameCreatorUsername(game.creator_id)}
                                        </span>
                                    </div> */}
                                    <div className="games-info"> 
                                            <i class="fas fa-football-ball games-icon "></i>
                                        {`  Equipment: ${game.equipment_needed}`}</div>
                                    <div className="games-info">
                                            <i class="fas fa-tachometer-alt games-icon"></i>
                                        {` ${skillLevel[game?.skill_level]}`}</div>
                                </div>
                                <div className="games-page-description">{`"${game?.description}"`}
                                    <span className="games-page-host">
                                        {findGameCreatorUsername(game.creator_id)}
                                    </span></div>
                                <div className="time-and-date-container">
                                    <div className="game-answer-date">
                                        {`${game?.start_time.split(' ')[2]} ${game?.start_time.split(' ')[1]}`}
                                    </div>
                                    <div className="game-answer-starttime">
                                        {handleTime(game.start_time)}
                                    </div>
                                </div>

                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Games;