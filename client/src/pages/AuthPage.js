import React from 'react';
import { useState, useRef, useContext } from 'react';
import styles from './AuthPage.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Axios from 'axios';

const AuthPage = () => {
  const UsernameInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = () => {
    const enteredUsername = UsernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    Axios.post('http://localhost:3001/login', {
      username: enteredUsername,
      password: enteredPassword,
    })
      .then((response) => {
        if (response.ok) {
          setErrorOccurred(false);
          return response.json();
        } else {
          response.json().then((data) => {
            // show an error message
            if (data && data.error && data.error.message) {
              setErrorOccurred(true);
              setErrorMessage(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        // authCtx.login(data.idToken, expirationTime.toISOString());
      });
  };

  return (
    <React.Fragment>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          ref={UsernameInputRef}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          ref={passwordInputRef}
        />

        {errorOccurred && <p>{errorMessage}</p>}

        <Link to="/admin" type="submit" className={styles.link}>
          <button className={styles.submitButton}>Log in</button>
        </Link>
      </form>
    </React.Fragment>
  );
};

export default AuthPage;
