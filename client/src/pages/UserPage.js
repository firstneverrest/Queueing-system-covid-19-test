import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './UserPage.module.css';

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [id, setId] = useState('1111122222333');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    Axios.post('http://localhost:3001/user', {
      id: id,
    }).then((response) => {
      if (response.status === 200) {
        setUserData(response.data);
      } else {
        throw new Error(response.error);
      }
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
    </div>
  );
};

export default UserPage;
