import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
    <nav className="navbar-container">
      <ul className="navbar-ul">
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user && 
        <>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
        </>
        }
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li></li>
        {user &&
        <li>
          <LogoutButton />
        </li>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
