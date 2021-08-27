import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../store/game';
import DateTime from 'react-datetime';
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
    const setStartTimeETV = (e) => setStartTime(e.target.value)
    const setEndTimeETV = (e) => setEndTime(e.target.value)

    const onFormSubmit = (e) => {
        e.preventDefault();
        // 
        console.log(userId)
        console.log(title)
        console.log(sport)
        console.log(description)
        console.log(equipmentNeeded)
        console.log(skillLevel)
        console.log(address)
        console.log(city)
        console.log(state)
        console.log(country)
        console.log(lat)
        console.log(lng)
        console.log(startTime)
        console.log(endTime)
        // 
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
        // setErrors([]);
        console.log(payload)
        dispatch(createGame(payload))
        // .then( (data) => {
        //     if (data && data.id) {
        //         history.push(`/`);
        //         window.location.reload();
        //     }
        // }).catch(async (res) => {
        //     const data = res;
        //     if (data && data.errors) setErrors(data.errors);
        // })
    }

    // const startTimeCalender = document.querySelector('start-time-calender')

    const handleDateTime = (dateTime) => {
        console.log(dateTime)
        const units = String(dateTime).split(' ');
        const calender = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let year = units[3];
        let day = units[2];
        let time = units[4];
        let month = String(calender.indexOf(units[1]) + 1);
        return `${year}-${month}-${day} ${time}`
    }

    let inputProps = {
        required: true
    } 

    return (
        <div className="form-container">
            <form onSubmit={onFormSubmit}>
                <div>Create Game</div>
                <ul>
                    {errors.map((error, idx) => 
                        <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder="title"
                        value={title}
                        onChange={setTitleETV}
                        type="text"
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder='sport'
                        value={sport}
                        onChange={setSportETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        placeholder='description'
                        value={description}
                        onChange={setDescriptionETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        placeholder='equipment needed'
                        value={equipmentNeeded}
                        onChange={setEquipmentNeededETV}
                    />
                </div>
                <div>
                    <select onChange={setSkillLevelETV}
                        className="form-input-field">
                        <option value={1}>beginner</option>
                        <option value={2}>intermediate</option>
                        <option value={3}>advanced</option>
                        <option value={4}>all skills welcome</option>
                    </select>
                </div>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder='address'
                        value={address}
                        onChange={setAddressETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder='city'
                        value={city}
                        onChange={setCityETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder='state'
                        value={state}
                        onChange={setStateETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder='country'
                        value={country}
                        onChange={setCountryETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        required
                        placeholder='latitude'
                        value={lat}
                        onChange={setLatETV}
                    />
                </div>
                <div>
                    <input
                        className="form-input-field"
                        placeholder='longitude'
                        required
                        value={lng}
                        onChange={setLngETV}
                    />
                </div>
                {/* <div>
                    <label>start time</label>
                    <input
                        placeholder='start time'
                        required={true}
                        // value={startTime}
                        onChange={setStartTimeETV}
                    />
                </div> */}
                <div>
                    <DateTime 
                    className="form-input-field"
                    inputProps={inputProps}
                    onChange={value => setStartTime(handleDateTime(value._d))}/>
                </div>
                <div>
                    end time<DateTime 
                        inputProps={inputProps}
                        onChange={value => {
                            console.log(value);
                            setEndTime(handleDateTime(value._d))}} />
                </div>
                {/* <div>
                    <label>end time</label>
                    <input
                        placeholder='end time'
                        required={true}
                        // value={endTime}
                        onChange={setEndTimeETV}
                    />
                </div> */}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default GameForm;