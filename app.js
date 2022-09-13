const express = require("express");
const app = express();
const port = 3005;

const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

//express settings
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ruoniai",
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bye', (req, res) => {
  res.send('Goodbye World!')
})


//READ
//Select column1, column2, ...
//From table_name;

//returns JSON string
app.get('/trees', (req, res) => {
  const sql = `
  SELECT * FROM medis
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
})

app.get('/trees/palmes', (req, res) => {
  const sql = `
  SELECT * FROM medis
  WHERE type = 1
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
})

app.get('/trees/mix', (req, res) => {
  const sql = `
  SELECT * FROM medis
  WHERE type = 1 OR type = 3
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
})

app.get('/trees/height', (req, res) => {
  const sql = `
  SELECT * FROM medis
  WHERE height > 6
  ORDER BY type, height DESC
  `;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
})

app.get('/trees/by/:type', (req, res) => {
  const sql = `
  SELECT * FROM medis
  WHERE type = ?
  ORDER BY title DESC
  `;
  con.query(sql, [req.params.type, req.query.sort === 'title' ? 'title' : 'height'], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})