import React from 'react';
import { useState, useRef, useContext } from 'react';
import styles from './AuthPage.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const AuthPage = () => {
  const UsernameInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const submitHandler = (e) => {
    const enteredUsername = UsernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    e.preventDefault();

    Axios.post('http://localhost:3001/login', {
      username: enteredUsername,
      password: enteredPassword,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setErrorOccurred(false);
        setErrorOccurred(false);
        const expirationTime = new Date(
          new Date().getTime() + +response.data.expiresIn * 1000
        );
        authCtx.login(response.data.token, expirationTime.toISOString());
        if (response.data.url === '/admin') {
          history.replace('/admin');
        } else {
          history.replace('/user');
        }
      } else {
        // show an error message
        setErrorMessage(response.data.error);
        setErrorOccurred(true);
      }
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

        {errorOccurred && <p className={styles.error}>{errorMessage}</p>}

        <button className={styles.submitButton} type="submit">
          Log in
        </button>
      </form>
    </React.Fragment>
  );
};

export default AuthPage;
