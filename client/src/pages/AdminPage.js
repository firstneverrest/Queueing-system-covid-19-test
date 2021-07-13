import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [userList, setUserList] = useState([]);
  const [status, setStatus] = useState('');
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get('http://localhost:3001/users').then((response) => {
      setUserList(response.data);
    });
  };

  const editHandler = (id) => {
    authCtx.setId(id);
    history.replace('/edit');
  };

  // waiting, tested - waiting for result, tested - negative, tested - positive

  return (
    <div className="Admin">
      <h2>Admin</h2>
      <h3>All User Data</h3>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Test Date</th>
            <th>Actual Test Date</th>
            <th>Edit</th>
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
                <td>{value.test_date}</td>
                <td>{value.actual_test_date}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => editHandler(value.id)}
                  >
                    Edit User
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AdminPage;
