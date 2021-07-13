import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [userList, setUserList] = useState([]);
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get('http://localhost:3001/users').then((response) => {
      setUserList(response.data);
    });
  };

  const editStatus = () => {
    Axios.patch('http://localhost:3001/user', {
      id: id,
      status: status,
    });
  };

  // waiting, tested - waiting for result, tested - negative, tested - positive

  return (
    <div className="Admin">
      <h2>Admin</h2>
      <h3>User Data</h3>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Address</th>
            <th>PhoneNumber</th>
            <th>Status</th>
            <th>Set Status</th>
          </tr>
        </thead>
        {userList.map((value, key) => {
          return (
            <tbody key={key}>
              <tr>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.birthday}</td>
                <td>{value.gender}</td>
                <td>{value.address}</td>
                <td>{value.phone_number}</td>
                <td>{value.status}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AdminPage;
