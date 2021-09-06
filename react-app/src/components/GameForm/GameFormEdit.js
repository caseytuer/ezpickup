import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateGame } from '../../store/game';
import DateTime from 'react-datetime';
import './GameForm.css'
import 'react-datetime/css/react-datetime.css'


export const GameFormEdit = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let { gameId } = useParams();
    const userId = useSelector((state) => state.session.user?.id);
    const game = useSelector(state => state.game[gameId])


    const handleEditDateTime = (dateTime) => {
        const units = String(dateTime).split(' ');
        const calender = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let year = units[3];
        let day = units[1]
        let time = units[4];
        let month = String(calender.indexOf(units[2]) + 1);
        if (units.length > 6) {
            day = units[2];
            month = String(calender.indexOf(units[1]) + 1);
        }
        // console.log(day)
        return `${year}-${month}-${day} ${time}`
    }

    useEffect(() => {
        if (!game) {
            history.push(`/games/${gameId}`);
            window.location.reload();
        }
    })


    const [title, setTitle] = useState(game?.title);
    const [sport, setSport] = useState(game?.sport);
    const [description, setDescription] = useState(game?.description);
    const [equipmentNeeded, setEquipmentNeeded] = useState(game?.equipment_needed);
    const [skillLevel, setSkillLevel] = useState(game?.skill_level);
    const [address, setAddress] = useState(game?.address);
    const [city, setCity] = useState(game?.city);
    const [state, setState] = useState(game?.state);
    const [country, setCountry] = useState(game?.country);
    const [lat, setLat] = useState(game?.lat);
    const [lng, setLng] = useState(game?.lng);
    const [startTime, setStartTime] = useState(handleEditDateTime(game?.start_time));
    const [endTime, setEndTime] = useState(handleEditDateTime(game?.end_time));
    const [errors, setErrors] = useState([]);

    const setTitleETV = (e) => setTitle(e.target.value);
    const setSportETV = (e) => setSport(e.target.value);
    const setDescriptionETV = (e) => setDescription(e.target.value)
    const setEquipmentNeededETV = (e) => setEquipmentNeeded(e.target.value)
    const setSkillLevelETV = (e) => setSkillLevel(e.target.value)
    const setAddressETV = (e) => setAddress(e.target.value)
    const setCityETV = (e) => setCity(e.target.value)
    const setStateETV = (e) => setState(e.target.value)
    const setCountryETV = (e) => setCountry(e.target.value)
    const setLatETV = (e) => setLat(e.target.value)
    const setLngETV = (e) => setLng(e.target.value)

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: game.id,
            creator_id: String(userId),
            title: String(title),
            sport: String(sport),
            description: String(description),
            equipment_needed: String(equipmentNeeded),
            skill_level: skillLevel,
            address: String(address),
            city: String(city),
            state: String(state),
            country: String(country),
            lat: lat,
            lng: lng,
            start_time: startTime,
            end_time: endTime,
        }
        setErrors([]);
        const data = await dispatch(updateGame(payload));
        if (data && data.id) {
            history.push(`/games/${data.id}`);
            window.location.reload();
        } else {
            setErrors(data)
        }
    }


    let inputPropsStart = {
        required: true,
        placeholder: 'Start Time',
        className: "form-input-field",
    }

    let inputPropsEnd = {
        required: true,
        placeholder: 'End Time',
        className: "form-input-field",
    }


    return (
        <div className="form-page-canvas">
            <div className="form-container">
                <form onSubmit={onFormSubmit}>
                    <div className="form-errors-container">
                        {errors && errors.map((error, idx) =>
                            <div className="form-errors" key={idx}>{error}</div>)}
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder="Title"
                            value={title}
                            onChange={setTitleETV}
                            type="text"
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder='Sport'
                            value={sport}
                            onChange={setSportETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            placeholder='Description'
                            value={description}
                            required
                            onChange={setDescriptionETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            placeholder='Equipment Needed'
                            value={equipmentNeeded}
                            required
                            onChange={setEquipmentNeededETV}
                        />
                    </div>
                    <div>
                        <select onChange={setSkillLevelETV}
                        defaultValue={skillLevel}
                            className="form-input-field">
                            <option value={1}>Beginner</option>
                            <option value={2}>Intermediate</option>
                            <option value={3}>Advanced</option>
                            <option value={4}>All Skills welcome</option>
                        </select>
                    </div>
                    <div>
                        <DateTime
                            initialValue={startTime}
                            inputProps={inputPropsStart}
                            onChange={(value) => setStartTime(handleEditDateTime(value._d))} />
                    </div>
                    <div>
                        <DateTime
                            initialValue={endTime}
                            inputProps={inputPropsEnd}
                            onChange={value => {
                                setEndTime(handleEditDateTime(value._d))
                            }} />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder='Address'
                            value={address}
                            onChange={setAddressETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder='City'
                            value={city}
                            onChange={setCityETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder='State'
                            value={state}
                            onChange={setStateETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder='Country'
                            value={country}
                            onChange={setCountryETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            required
                            placeholder='Latitude'
                            value={lat}
                            onChange={setLatETV}
                        />
                    </div>
                    <div>
                        <input
                            className="form-input-field"
                            placeholder='Longitude'
                            required
                            value={lng}
                            onChange={setLngETV}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="form-btn"
                        >Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GameFormEdit;