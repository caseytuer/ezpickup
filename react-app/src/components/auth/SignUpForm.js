import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profileImage, setProfileImage] = useState('https://freesvg.org/img/abstract-user-flat-3.png')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullName, username, email, password, profileImage));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords must match"])
    }
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  }

  if (user) {
    return <Redirect to='/games' />;
  }

  return (
    <div className="form-page-canvas">
      <div className="form-container">
        <form onSubmit={onSignUp}>
          <div>
            {errors && errors.map((error, ind) => (
              <div key={ind}>{error}</div>
              ))}
          </div>
              {profileImage && 
                <div>
                <img className="profile-image-preview" src={profileImage} alt=""></img>
              </div>}
          <div>
            <input
              placeholder="full name"
              className="form-input-field"
              type='text'
              name='Full Name'
              onChange={updateFullName}
              value={fullName}
              required={true}
            ></input>
          </div>
          <div>
            <input
              placeholder="username"
              className="form-input-field"
              type='text'
              name='Username'
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
          </div>
          <div>
            <input
              placeholder="email"
              className="form-input-field"
              type='email'
              name='Email'
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
          </div>
          <div>
            <input
              placeholder="password"
              className="form-input-field"
              type='password'
              name='Password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div>
            <input
              placeholder="confirm password"
              className="form-input-field"
              type='password'
              name='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div>
            <input
              placeholder="Profile Image URL"
              className="form-input-field"
              type='text'
              name='Profile Image'
              onChange={updateProfileImage}
            ></input>
          </div>
          <button type='submit'
          className="form-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
