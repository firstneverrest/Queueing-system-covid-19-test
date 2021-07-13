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
  const token = req.body.token;
  const data = jwt.verify(token, 'Queue');
  db.query(
    `SELECT * FROM general_user WHERE username=?`,
    [data.username],
    (err, result) => {
      if (err) {
        res.status(404).send({ error: 'Not found your id' });
      } else {
        res.status(200).send(result);
      }
    }
  );
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const expiresIn = 3600;
  let token = jwt.sign({ username: username }, 'Queue');

  if (username === 'admin') {
    db.query(
      `SELECT id FROM admin WHERE username=? AND password=?`,
      [username, password],
      (err, result) => {
        if (result.length > 0) {
          let url = '/admin';
          if (username === 'admin' && password === 'admin') {
            console.log(result);
            res
              .status(200)
              .send({ result, url: url, expiresIn: expiresIn, token: token });
          }
        } else {
          res.status(201).send({ error: 'Invalid Username or Password' });
        }
      }
    );
  } else {
    db.query(
      `SELECT id FROM general_user WHERE username=? AND password=?`,
      [username, password],
      (err, result) => {
        if (result.length > 0) {
          let url = '/user';
          res
            .status(200)
            .send({ result, url: url, expiresIn: expiresIn, token: token });
        } else {
          res.status(201).send({ error: 'Invalid Username or Password' });
        }
      }
    );
  }
});

app.put('/user', (req, res) => {
  const id = req.body.id;
  const token = req.body.token;
  const status = req.body.status;
  const testDate = req.body.testDate;
  const actualTestDate = req.body.actualTestDate;
  const data = jwt.verify(token, 'Queue');
  if (data.username === 'admin') {
    db.query(
      'UPDATE general_user SET status=?, test_date=?, actual_test_date=? WHERE id=?',
      [status, testDate, actualTestDate, id],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send('completed');
        }
      }
    );
  } else {
    res.status(403);
  }
});

app.post('/new', (req, res) => {
  const token = req.body.token;
  const id = req.body.id;
  const name = req.body.name;
  const birthday = req.body.birthday;
  const gender = req.body.gender;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    'INSERT INTO general_user (id, name, birthday, gender, address, phone_number, username, password, status, test_date, actual_test_date, idToken) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)',
    [
      id,
      name,
      birthday,
      gender,
      address,
      phoneNumber,
      username,
      password,
      '',
      '',
      '',
      '',
    ],
    (err, result) => {
      console.log(err);
      if (err) {
        res.status(401).send(err);
      } else {
        res.send('completed');
      }
    }
  );
});

app.listen('3001', () => {
  console.log('Server is running on port 3001');
});
