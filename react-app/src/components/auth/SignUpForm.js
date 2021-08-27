import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="form-page-canvas">
      <div className="form-container">
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              placeholder="username"
              className="form-input-field"
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <input
              placeholder="email"
              className="form-input-field"
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <input
              placeholder="password"
              className="form-input-field"
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <input
              placeholder="confirm password"
              className="form-input-field"
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
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
