import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteGame, getGame } from '../../store/game';
import { updateGame } from '../../store/game';
import './Game.css'



const Game = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { gameId } = useParams();
    const game = useSelector(state => state.game[gameId])
    console.log(game)

    const [title, setTitle] = useState();
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
            start_time: '2021-12-16 12:00:00',
            end_time: '2021-12-16 16:00:00',
            created_at: '2021-12-16 12:00:00'
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

    return (
        <div>
            <button onClick={handleDelete}>delete game</button>
            <form onSubmit={handleEdit} className="game-card-field" id="game-card-title-edit-btn" >
                <div>
                    <button type='submit'>edit</button>
                    <div>title</div>
                    <div id="game-card-title-field" >{game?.title} </div>
                    <div>
                        <input
                            placeholder={game?.title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                        />
                        <button onClick={handleSubmitTitle}type='submit'>save</button>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
            </form>
            <div className="game-card-field">
                <div>sport</div>
                <div>{game?.sport} </div>
            </div>
            <div className="game-card-field" >{game?.description}</div>
            <div className="game-card-field" >{game?.address}</div>
            <div className="game-card-field" >{game?.city}</div>
        </div>
    )
}

export default Game;