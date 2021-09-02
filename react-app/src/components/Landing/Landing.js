import landingHoop from '../../assets/images/landing-hoop.jpg'
import './Landing.css'

const welcomeMessage = "Welcome to ezpickup"
const secondaryMessage = "Find free local sports near you"

const Landing = () => {
    return (
        <div className="landing-canvas">
            <div className="welcome-message">
                <div className="welcome-title landing-text">{welcomeMessage}</div>
                <div className="landing-text">{secondaryMessage}</div>
            </div>
        </div>
        
    )
}

export default Landing;