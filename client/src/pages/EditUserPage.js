import React from 'react';
import { useState, useRef, useContext } from 'react';
import styles from './EditUserPage.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const EditUserPage = () => {
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [userId, setUserId] = useState('');
  const statusInputRef = useRef();
  const testDateInputRef = useRef();
  const actualTestDateInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const id = authCtx.getId();

  const editStatus = (e) => {
    e.preventDefault();
    const enteredStatus = statusInputRef.current.value;
    const enteredTestDate = testDateInputRef.current.value;
    const enteredActualTestDate = actualTestDateInputRef.current.value;
    const token = authCtx.token;

    Axios.put('http://localhost:3001/user', {
      id: id,
      token: token,
      status: enteredStatus,
      testDate: enteredTestDate,
      actualTestDate: enteredActualTestDate,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setErrorOccurred(false);
        setErrorOccurred(false);
        history.replace('/admin');
      } else {
        // show an error message
        setErrorMessage(response.data.error);
        setErrorOccurred(true);
      }
    });
  };

  const backToAdmin = () => {
    history.replace('/admin');
  };

  return (
    <React.Fragment>
      <h1>Edit User {id}</h1>
      <form className={styles.loginForm} onSubmit={editStatus}>
        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          required
          ref={statusInputRef}
        />

        <label htmlFor="name">Test Date</label>
        <input
          type="text"
          id="testDate"
          name="testDate"
          required
          ref={testDateInputRef}
        />

        <label htmlFor="name">Actual Test Date</label>
        <input
          type="text"
          id="actualTestDate"
          name="actualTestDate"
          required
          ref={actualTestDateInputRef}
        />

        {errorOccurred && <p className={styles.error}>{errorMessage}</p>}

        <div className={styles.buttonContainer}>
          <button className={styles.backButton} onClick={backToAdmin}>
            Cancel
          </button>
          <button className={styles.submitButton} type="submit">
            Save
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditUserPage;
