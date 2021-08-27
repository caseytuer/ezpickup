import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteGame, getGame } from '../../store/game';
import { updateGame } from '../../store/game';
import { Link } from 'react-router-dom';
import './Game.css'
import bannerImage from '../../assets/images/bball-sillouette.png';
import Map from '../Map';
import UsersList from '../UsersList';
import User from '../User';



const Game = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { gameId } = useParams();
    const game = useSelector(state => state.game[gameId])

    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    // const [sport, setSport] = useState(game?.sport);
    // const [description, setDescription] = useState(game?.description);
    // const [equipmentNeeded, setEquipmentNeeded] = useState(game?.equipment_needed);
    // const [skillLevel, setSkillLevel] = useState(game?.skill_level);
    // const [address, setAddress] = useState(game?.address);
    // const [city, setCity] = useState(game?.city);
    // const [state, setState] = useState(game?.state);
    // const [country, setCountry] = useState(game?.country);
    // const [lat, setLat] = useState(game?.lat);
    // const [lng, setLng] = useState(game?.lng);
    // const [startTime, setStartTime] = useState(game?.start_time);
    // const [endTime, setEndTime] = useState(game?.end_time)
    // const [errors, setErrors] = useState([])

    // const setTitleETV = (e) => setTitle(e.target.value);
    // const setSportETV = (e) => setSport(e.target.value);


    useEffect(() => {
        dispatch(getGame(gameId))
    }, [dispatch])
    
    const handleEdit = (e) => {
        e.preventDefault()
        // console.log(e.currentTarget)
        // let input = document.getElementById('game-card-title-field')
        // let editBtn = document.getElementById('game-card-title-edit-btn')
        // input.display = 'none';
        // editBtn.hidden = true;
    }

    const handleSubmitTitle = (e) => {
        e.preventDefault()
        const payload = {
            id: gameId,
            creator_id: game.creator_id,
            title: title,
            sport: game.sport,
            description: game.description,
            equipment_needed: game.equipment_needed,
            skill_level: game.skill_level,
            address: game.address,
            city: game.city,
            state: game.state,
            country: game.country,
            lat: game.lat,
            lng: game.lng,
            start_time: game.start_time,
            end_time: game.end_time,
        }
        console.log(payload)
        dispatch(updateGame(payload))
        // let input = document.getElementById('game-card-title-field');
        // let editBtn = document.getElementById('game-card-title-edit-btn')
        // console.log(input)
        // input.display = 'block';
        // editBtn.hidden = false;
    }
    
    const handleDelete = () => {
        const deleted = dispatch(deleteGame(gameId))
        if (deleted) {
            history.push('/')
        }
    }

    const findCreator = (game) => {
        const user = users?.find(user => user?.id === game?.creator_id)
        return user?.username
    }

    const skillLevel = ['none', 'Beginner', 'Intermediate', 'Advanced']

    const handleTime = (time) => {
        const militaryTime = time?.split(' ')[4]
        let hours = militaryTime?.split(':')[0]
        if (Number(hours) < 10) {
            hours = hours?.split('')[1]
            return `${hours}:${militaryTime?.split(':').slice(1, 2).join(':')}AM `
        } else if (Number(hours) < 12) {
            return `${militaryTime?.split(':').slice(0,2).join(':')}AM `
        } else if (Number(hours) === 12) {
            return `${militaryTime?.split(':').slice(0,2).join(':')}PM `
        } else {
            return `${hours % 12}:${militaryTime?.split(':').slice(1,2).join(':')}PM `
        }
    }


    return (
        <>
            <div>
                <Map game={game} />
            </div>
            <div className="find-another-game">
                <Link to="/" className="find-another-game-btn">Find Another Game</Link>
            </div>
            <div className="game-page-canvas">
                <div className="game-page-side-banner">
                    <img src={bannerImage} alt=""></img>
                </div>
                <div className="game-page-container">
                    {/* <button onClick={handleDelete}>delete game</button> */}
                    <form onSubmit={handleEdit} className="game-card-field" id="game-card-title-edit-btn" >
                        <div>
                            {/* <button type='submit'>edit</button> */}
                            <div 
                            className="game-page-title" id="game-card-title-field" >{game?.title} 
                                <span className="game-card-field game-page-sport">{` (${game?.sport})`} 
                                </span>
                            </div>
                            {/* <div>
                                <input
                                    placeholder={game?.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                />
                                <button onClick={handleSubmitTitle}type='submit'>save</button>
                            </div> */}
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </form>
                        <div className="game-card-field" >
                            <span className="game-page-details">
                                {`${game?.address}, `} 
                            </span>
                            <span className="game-page-details">
                                {`${game?.city}, `}
                            </span>
                            <span className="game-page-details">
                                {game?.state}
                            </span>
                        </div>
                        <div className="game-card-field game-page-details" >
                            <span>{game?.start_time.split(' ').slice(0,4).join(' ')}</span>
                        </div>
                    <div className="game-page-where-when"></div>
                    <div className="game-card-field" >
                        <span className="game-page-details"></span>
                        <span className="game-page-details">{handleTime(game?.start_time)}- </span>
                        <span className="game-page-details">{handleTime(game?.end_time)}</span>
                    </div>
                <div className="game-card-field game-page-description">{`"${game?.description}"`}</div>
                <div>{`-${findCreator(game)}`}</div>
                </div>
            </div>
        </>
    )
}

export default Game;