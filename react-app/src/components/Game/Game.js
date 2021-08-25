import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGame } from '../../store/game';



const Game = () => {
    let { gameId } = useParams();
    console.log(gameId)

}