import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../store/game';


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
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [startTime, setStartTime] = useState('2021-12-16 12:12:00');
    const [endTime, setEndTime] = useState('2021-12-16 12:12:00')
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
    // const setStartTimeETV = (e) => setStartTime(e.target.value)
    // const setEndTimeETV = (e) => setEndTime(e.target.value)

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
            creator_id: userId,
            title: title,
            sport: sport,
            description: description,
            equipment_needed: equipmentNeeded,
            skill_level: skillLevel,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            start_time: startTime,
            end_time: endTime,
            created_at: endTime
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

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div>Create Game</div>
                <ul>
                    {errors.map((error, idx) => 
                        <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label>title</label>
                    <input 
                        placeholder="title"
                        required
                        value={title}
                        onChange={setTitleETV}
                        type="text"
                    />
                </div>
                <div>
                    <label>sport</label>
                    <input
                        placeholder='sport'
                        required={true}
                        value={sport}
                        onChange={setSportETV}
                    />
                </div>
                <div>
                    <label>description</label>
                    <input
                        placeholder='description'
                        required={true}
                        value={description}
                        onChange={setDescriptionETV}
                    />
                </div>
                <div>
                    <label>equipment needed</label>
                    <input
                        placeholder='equipment needed'
                        required={true}
                        value={equipmentNeeded}
                        onChange={setEquipmentNeededETV}
                    />
                </div>
                <div>
                    <label>skill level</label>
                    <select onChange={setSkillLevelETV}>
                        <option value={1}>beginner</option>
                        <option value={2}>intermediate</option>
                        <option value={3}>advanced</option>
                        <option value={4}>all skills welcome</option>
                    </select>
                </div>
                <div>
                    <label>address</label>
                    <input
                        placeholder='address'
                        required={true}
                        value={address}
                        onChange={setAddressETV}
                    />
                </div>
                <div>
                    <label>city</label>
                    <input
                        placeholder='city'
                        required={true}
                        value={city}
                        onChange={setCityETV}
                    />
                </div>
                <div>
                    <label>state</label>
                    <input
                        placeholder='state'
                        required={true}
                        value={state}
                        onChange={setStateETV}
                    />
                </div>
                <div>
                    <label>country</label>
                    <input
                        placeholder='country'
                        required={true}
                        value={country}
                        onChange={setCountryETV}
                    />
                </div>
                <div>
                    <label>latitude</label>
                    <input
                        placeholder='latitude'
                        required={true}
                        value={lat}
                        onChange={setLatETV}
                    />
                </div>
                <div>
                    <label>longitude</label>
                    <input
                        placeholder='lng'
                        required={true}
                        value={lng}
                        onChange={setLngETV}
                    />
                </div>
                <div>
                    <label>start time</label>
                    <input
                        placeholder='start time'
                        required={true}
                        value={startTime}
                        // onChange={setStartTimeETV}
                    />
                </div>
                <div>
                    <label>end time</label>
                    <input
                        placeholder='end time'
                        required={true}
                        value={endTime}
                        // onChange={setEndTimeETV}
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default GameForm;