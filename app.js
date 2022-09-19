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

//CREATE
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);
app.post('/trees', (req, res) => {
  const sql = `
  INSERT INTO medis (title, height, type)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// DELETE
// DELETE FROM table_name WHERE condition;
app.delete('/trees/:id', (req, res) => {
  const sql = `
  DELETE FROM Medis WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// EDIT
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;
app.put('/trees/:id', (req, res) => {
  const sql = `
  UPDATE Medis SET title = ?, height = ?, type= ? WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})