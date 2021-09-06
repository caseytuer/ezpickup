import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteGame, getGame } from '../../store/game';
import { Link } from 'react-router-dom';
import './Game.css'
import Map from '../Map';
import trashIcon from '../../assets/images/trash-icon.png';
import trashIconYellow from '../../assets/images/trash-icon-yellow.png';
import penIcon from '../../assets/images/pen-icon.png';
import penIconYellow from '../../assets/images/pen-icon-yellow.png';
import Comments from '../Comments';
import { createPlayer, deletePlayer, getPlayers } from '../../store/player';



const Game = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { gameId } = useParams();
    const game = useSelector(state => state.game[gameId])
    const user = useSelector(state => state.session.user)
    const allPlayers = useSelector(state => state.player)

    //update reducer to serve array
    let playersArr = [];
    for (let key in allPlayers) {
        playersArr.push(allPlayers[key])
    }

    const currentPlayers = playersArr.filter(player => Number(player.game_id) === Number(gameId))

    const [users, setUsers] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentPlayers.some(player => player?.player_id === user?.id)) {
            setIsJoined(true)
        } else {
            setIsJoined(false)
        }
    }, [currentPlayers, user?.id])
    // else {
    //     setIsJoined(false)
    // }
    // useEffect(() => {
    //     setIsJoined()
    // }, [setIsJoined])
    const joinCheckbox = document.getElementById('join-checkbox');

    if (isJoined) {
        joinCheckbox.checked = true;
    } 
    

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        dispatch(getGame(gameId));
        dispatch(getPlayers(gameId))
    }, [dispatch, gameId])
    
    
    const handleJoin = () => {
        if (!isJoined) {
            const payload = {
                player_id: user.id,
                game_id: gameId
            }
            setIsJoined(true);
            setErrors([]);
            dispatch(createPlayer(payload))
            .then((data) => {
                if (data && data.id) {
                    history.push(`/games/${gameId}`);
                }
            }).catch(async(res) => {
                const data = res;
                if (data && data.errors) setErrors(data.errors)
            })
        } else {
            const player = currentPlayers.find(player => player.player_id === user.id);
            const playerId = player.id;
            setIsJoined(false);
            setErrors([]);
            dispatch(deletePlayer(playerId))
                .then((data) => {
                    if (data && data.id) {
                        history.push(`/games/${gameId}`);
                        window.location.reload();
                    }
                }).catch(async (res) => {
                    const data = res;
                    if (data && data.errors) setErrors(data.errors)
                })
            // dispatch(getPlayers(gameId))
        }
    }


    const handleDelete = () => {
        const deleted = dispatch(deleteGame(gameId))
        if (deleted) {
            history.push('/games')
        }
    }

    const findCreator = (game) => {
        const user = users?.find(user => user?.id === game?.creator_id)
        return user
    }

    // const getCreatorImg = (game) => {
    //     const creatorImg = users?.find(user => user?.id === game)
    // }

    const skillLevel = ['none', 'Beginner', 'Intermediate', 'Advanced', 'All Skills Welcome']

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

    const hoverTrashIcon = () => {
        const trashCanIcon = document.getElementById('trash-icon')
        trashCanIcon.setAttribute('src', trashIconYellow)
    }

    const unHoverTrashIcon = () => {
        const trashCanIcon = document.getElementById('trash-icon')
        trashCanIcon.setAttribute('src', trashIcon)
    }

    const hoverPenIcon = () => {
        const penEditIcon = document.getElementById('pen-icon')
        penEditIcon.setAttribute('src', penIconYellow)
    }

    const unHoverPenIcon = () => {
        const penEditIcon = document.getElementById('pen-icon')
        penEditIcon.setAttribute('src', penIcon)
    }

    const calendarDate = `${game?.start_time.split(' ')[2]} ${game?.start_time.split(' ')[1]}`


    return (
        <>
        <div className="top-banner"></div>
            <div className="find-another-game">
                <Link to="/games" className="find-another-game-btn">Find Another Game</Link>
            </div>
            <div className="game-page-canvas">
                {/* <div className="game-page-side-banner">
                    <img src={bannerImage} alt=""></img>
                </div> */}
                <div className="game-page-container">
                    <div className="game-info-container">
                        <div className="game-info-icons">
                            <div className="calendar-date-container">
                                <div className="calendar-date">
                                    {calendarDate}
                                </div>
                            </div>
                            <div className="start-time-container">
                                <div className="start-time">
                                    {handleTime(game?.start_time)}
                                </div>
                            </div>
                            <div className="skill-level-container">
                                <div className="skill-level">
                                    {skillLevel[game?.skill_level]}
                                </div>
                            </div>
                        </div>
                        <div className="game-page-title-and-description">
                            <div>
                                <div 
                                className="game-page-title" id="game-card-title-field" >
                                <div>
                                    {`${game?.title} `} 
                                </div>
                                <div className="game-page-sport">
                                    {`${game?.sport}`} 
                                </div>
                            </div>
                                </div>
                            <div className=" 
                                game-page-description">
                                {`"${game?.description}"`}
                                <div className="game-description-user">
                                <img className="host-img" src={findCreator(game)?.profile_image} alt=''></img>
                                <div>
                                    <div>
                                        {`${findCreator(game)?.username}`}
                                    </div>
                                    <div>{`${findCreator(game)?.full_name}`}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        {user &&
                        <div className="join-game-container">
                            <label className="join-check-container">
                                <input type='checkbox'
                                    id="join-checkbox"
                                    onChange={handleJoin}
                                ></input>
                                {" Join"}
                                <span className="checkbox"></span>
                            </label>
                                <span>{`Roster: ${currentPlayers.length}`}</span>
                        </div>
                        }
                        {!user && 
                            <div className="join-game-container">
                                <Link to='/login' className="join-check-container">
                                    <input type='checkbox'
                                        id="join-checkbox-logged-out"
                                        checked={false}
                                    ></input>
                                    {" Join"}
                                    <span className="checkbox"></span>
                                </Link>
                                <span>{`Roster: ${currentPlayers.length}`}</span>
                            </div>}
                    </div>
                    
                            {user?.id === game?.creator_id && 
                                <div className="edit-and-delete-btns">
                                    <Link to={`/games/edit/${gameId}`}
                                        onMouseOver={hoverPenIcon}
                                        onMouseOut={unHoverPenIcon}
                                        className="delete-game-btn">
                                        <img src={penIcon} alt="" 
                                            className="delete-game-btn-icon"
                                            id="pen-icon"/>
                                        Edit Game</Link>
                                    <span onClick={handleDelete}
                                        onMouseOver={hoverTrashIcon}
                                        onMouseOut={unHoverTrashIcon}
                                        className="delete-game-btn"> 
                                            <img src={trashIcon} alt="" 
                                            className="delete-game-btn-icon"
                                            id="trash-icon"
                                            />
                                        Delete Game</span>
                                </div>
                            }
                <div className="game-page-map-container">
                    <Map game={game} />
                </div>
            <div className="comments-canvas">
                <Comments users={users}/>
            </div>
                </div>
            </div>
        </>
    )
}

export default Game;