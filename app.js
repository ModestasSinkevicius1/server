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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})