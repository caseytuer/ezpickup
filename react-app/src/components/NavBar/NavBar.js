import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './NavBar.css'
import logo from '../../assets/images/logo.png'

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
    <nav className="navbar-container">
      <ul className="navbar-ul">
        <li>
          <NavLink to='/games' 
            exact={true} 
            activeClassName='active'
          >
            <img src={logo} alt=""
              className="navbar-logo"
              />
          </NavLink>
        </li>
        {!user && 
        <div className="login-and-signup-container">
          <li>
            <NavLink to='/login' exact={true}         
            activeClassName='active'
              className="navbar-btn">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'
            className="navbar-btn navbar-signup-btn">
              Sign Up
            </NavLink>
          </li>
        </div>
        }
        {user &&
        <div className="create-and-logout-container">
          <li>
            <NavLink to='/games/create' className="create-btn navbar-btn">
              Create a Game
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </div>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
