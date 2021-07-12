import React from 'react';
import { useState, useRef, useContext } from 'react';
import styles from './AuthPage.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const AuthPage = () => {
  return (
    <React.Fragment>
      <h1>Login</h1>
      <form className={styles.loginForm}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <Link to="/admin" type="submit" className={styles.link}>
          <button className={styles.submitButton}>Log in</button>
        </Link>
      </form>
    </React.Fragment>
  );
};

export default AuthPage;
