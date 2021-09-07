import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import mapPin from '../../assets/images/bball-map-pin.png'
import './Map.css'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({gamesArr}) => {
    let { gameId } = useParams();
    const game = useSelector(state => state.game[gameId])
    const MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY;


    let props = {
            center: {
                lat: 32.851654506454985,
                lng: -117.21027709999998
            },
            zoom: 11,
        };

    if (game) {
        props = {
                center: {
                    lat: game.lat,
                    lng: game.lng
                },
                zoom: 15,
            }
        }


    const Marker = ({ lat, lng }) => (
        <div >
            <img
            className="map-marker" src={mapPin} alt=""></img>
        </div>
    );

    
   

    return (
        <div style={{ height: '100%', width: '100%' }}>
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
                </div>}
                {!game && gamesArr?.map(game => {
                    return (
                        <Link
                        to={`/games/${game.id}`}
                        key={game.id} 
                        lat={game.lat}
                        lng={game.lng}
                        text={game.title}
                        >
                            <Marker/>
                    </Link>
                    )})}
                
            </GoogleMapReact>
        </div>
    );
    
}

export default Map;