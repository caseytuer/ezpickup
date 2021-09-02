import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../store/session'
import landingHoop from '../../assets/images/landing-hoop.jpg'
import './Landing.css'

const welcomeMessage = "Welcome to ezpickup"
const secondaryMessage = "Find free local sports near you"

const Landing = () => {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);

    const onDemoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
            setErrors(data)
        }
    };

    return (
        <div className="landing-canvas">
            <div className="welcome-message">
            <button
                    onClick={onDemoLogin}
                    className="form-demo-btn">Explore as Demo User
            </button>
            <div>
                <div className="welcome-title landing-text">{welcomeMessage}
                </div>
                <div className="landing-text">{secondaryMessage}</div>
            </div>
            <button
                className="form-demo-btn about-link">About the Project</button>
            </div>
        </div>
        
    )
}

export default Landing;