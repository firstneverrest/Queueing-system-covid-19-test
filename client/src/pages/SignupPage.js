import React from 'react';
import { useState, useRef, useContext } from 'react';
import styles from './SignupPage.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const SignupPage = () => {
  const idInputRef = useRef();
  const nameInputRef = useRef();
  const birthdayInputRef = useRef();
  const genderInputRef = useRef();
  const addressInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredId = idInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredBirthday = birthdayInputRef.current.value;
    const enteredGender = genderInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const token = authCtx.token;

    Axios.post('http://localhost:3001/new', {
      token: token,
      id: enteredId,
      name: enteredName,
      birthday: enteredBirthday,
      gender: enteredGender,
      address: enteredAddress,
      phoneNumber: enteredPhoneNumber,
      username: enteredUsername,
      password: enteredPassword,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setErrorOccurred(false);
        setErrorOccurred(false);
        history.replace('/login');
      } else {
        // show an error message
        setErrorMessage(response.data.error);
        setErrorOccurred(true);
      }
    });
  };

  return (
    <React.Fragment>
      <h1>Signup</h1>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <label htmlFor="username">Citizen Id</label>
        <input type="text" id="id" name="id" required ref={idInputRef} />

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required ref={nameInputRef} />
        <label htmlFor="birthday">Birthday</label>
        <input
          type="text"
          id="birthday"
          name="birthday"
          required
          ref={birthdayInputRef}
        />
        <label htmlFor="gender">Gender</label>
        <input
          type="text"
          id="gender"
          name="gender"
          required
          ref={genderInputRef}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          ref={addressInputRef}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          required
          ref={phoneNumberInputRef}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          ref={usernameInputRef}
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
          Sign up
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignupPage;
