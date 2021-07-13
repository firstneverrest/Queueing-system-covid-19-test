import AuthContext from '../store/auth-context';
import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import styles from './UserPage.module.css';

const UserPage = () => {
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    Axios.post('http://localhost:3001/user', {
      token: authCtx.token,
    }).then((response) => {
      if (response.status === 200) {
        setUserData(response.data);
        setIsData(true);
      } else {
        throw new Error(response.error);
      }
    });
  };

  return (
    <div className="User">
      <h2>General User</h2>
      <h3>Your Data</h3>
      {isData && (
        <table className={styles.userTable}>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userData[0].id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{userData[0].name}</td>
            </tr>
            <tr>
              <th>Birthday</th>
              <td>{userData[0].birthday.toString().substring(0, 10)}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{userData[0].gender}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{userData[0].address}</td>
            </tr>
            <tr>
              <th>PhoneNumber</th>
              <td>{userData[0].phone_number}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{userData[0].status}</td>
            </tr>
            <tr>
              <th>Test Date</th>
              <td>{userData[0].test_date}</td>
            </tr>
            <tr>
              <th>Actual Test Date</th>
              <td>{userData[0].acutal_test_date}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPage;
