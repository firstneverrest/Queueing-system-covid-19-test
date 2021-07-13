const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '1234',
  database: 'queueing_system',
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM general_user', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/user', (req, res) => {
  const id = req.body.id;
  db.query(`SELECT * FROM general_user WHERE id=?`, [id], (err, result) => {
    res.send(result);
    // if (err) {
    //   res.status(404).send({ error: 'Not found your id' });
    // } else {
    //   res.status(200).send(result);
    // }
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    `SELECT id FROM general_user WHERE username=? AND password=?`,
    [username, password],
    (err, result) => {
      if (err) {
        res.status(404).send({ error: 'Invalid username or password' });
      } else {
        res.status(200).send(result);
      }
    }
  );
  // const token = jwt.sign({ username: username }, 'Queue');
});

app.patch('/user', (req, res) => {});

app.listen('3001', () => {
  console.log('Server is running on port 3001');
});
