const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '1234',
  database: 'queueing_system',
});

app.get('/user', (req, res) => {
  db.query('SELECT * FROM general_user', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen('3001', () => {
  console.log('Server is running on port 3001');
});
