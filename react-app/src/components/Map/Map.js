import GoogleMapReact from 'google-map-react';
import { useEffect } from 'react';
import { getAllGames } from '../../store/game';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import mapPin from '../../assets/images/bball-map-pin.png'
import './Map.css'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({gamesArr, game}) => {

    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;

    const props = {
        center: {
            lat: 32.851654506454985,
            lng: -117.21027709999998
        },
        zoom: 11,
    };

    const Marker = ({ lat, lng }) => (
        <div >
            <img className="map-marker" src={mapPin} alt=""></img>
        </div>
    );

    console.log(process.env)
   

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: MAPS_API_KEY
                }}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
            >
                {game && 
                <div
                    lat={game.lat}
                    lng={game.lng}
                    text={game.title}
                >
                    <Marker/>
                </div>
                }
                {gamesArr && gamesArr.map(game => (
                    <Link 
                    key={game.id} 
                    to={`/games/${game.id}`}
                    lat={game.lat}
                    lng={game.lng}
                    text={game.title}
                    >
                        <Marker/>
                    </Link>
                ))}
                {/* <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                /> */}
            </GoogleMapReact>
        </div>
    );
    
}

export default Map;