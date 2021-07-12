import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './UserPage.module.css';

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // getUserData();
  }, []);

  const getUserData = () => {
    Axios.get('http://localhost:3001/user').then((response) => {
      setUserData(response.data);
    });
  };

  return (
    <div className="User">
      <h2>General User</h2>
      <h3>Your Data</h3>
      <table className={styles.userTable}>
        <tbody>
          <tr>
            <th>Id</th>
            <td>data</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>data</td>
          </tr>
          <tr>
            <th>Birthday</th>
            <td>data</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>data</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>data</td>
          </tr>
          <tr>
            <th>PhoneNumber</th>
            <td>data</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>data</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
