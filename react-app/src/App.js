import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Game from './components/Game';
import Games from './components/Games';
import GameForm from './components/GameForm';
import GameFormEdit from './components/GameForm/GameFormEdit';
import Landing from './components/Landing';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Footer />
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <User/>
        </ProtectedRoute>
        <Route path='/games' exact={true} >
          <Games/>
        </Route>
        <ProtectedRoute path='/games/create' exact={true}>
          <GameForm/>
        </ProtectedRoute>
        <Route path='/games/:gameId' exact={true} >
          <Game/>
        </Route>
        <ProtectedRoute path='/games/edit/:gameId' exact={true}>
          <GameFormEdit/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}



export default App;
