import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../store/game';
import DateTime from 'react-datetime';
import './GameForm.css'
import 'react-datetime/css/react-datetime.css'


export const GameForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user?.id);

    const [title, setTitle] = useState('');
    const [sport, setSport] = useState('');
    const [description, setDescription] = useState('');
    const [equipmentNeeded, setEquipmentNeeded] = useState('');
    const [skillLevel, setSkillLevel] = useState(4);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const [errors, setErrors] = useState([])

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
        const data = await dispatch(createGame(payload));
        if (data && data.id) {
            history.push(`/games/${data.id}`);
                window.location.reload();
        } else {
            setErrors(data)
        }
    }

    const handleDateTime = (dateTime) => {
        const units = String(dateTime).split(' ');
        const calender = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let year = units[3];
        let day = units[2];
        let time = units[4];
        let month = String(calender.indexOf(units[1]) + 1);
        return `${year}-${month}-${day} ${time}`
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
            <div className="game-form-container">
                <form onSubmit={onFormSubmit}>
                    <div className="form-errors-container">
                        {errors && errors.map((error, idx) => (
                            <div className="form-errors" key={idx}>{error}</div>
                            ))}
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
                            required
                            value={equipmentNeeded}
                            onChange={setEquipmentNeededETV}
                        />
                    </div>
                    <div>
                        <select onChange={setSkillLevelETV}
                            className="form-input-field">
                            <option value={1}>Beginner</option>
                            <option value={2}>Intermediate</option>
                            <option value={3}>Advanced</option>
                            <option value={4}>All Skills welcome</option>
                        </select>
                    </div>
                    <div>
                        <DateTime 
                        inputProps={inputPropsStart}
                        onChange={value => setStartTime(handleDateTime(value._d))}/>
                    </div>
                    <div>
                        <DateTime 
                            inputProps={inputPropsEnd}
                            onChange={value => {
                                setEndTime(handleDateTime(value._d))}} />
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

export default GameForm;