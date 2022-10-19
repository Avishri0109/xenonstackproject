const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encode = bodyParser.urlencoded();
const app = express();
app.use("/assets", express.static("assets"));
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "avishri@1234",
  database: "avishridb",
});
//connect to the database
connection.connect(function (error) {
  if (error) throw error;
  else console.log("connected to the database successfully!");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/",encode, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    "select * from loginuser where user_name=? and user_pass=?",
    [username, password],
    function (error, results, fields) {
      if (results.length > 0) {
        res.redirect("/welcome");
      } else {
        res.redirect("/");
      }
      res.end();
    });
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/welcome.html");
});
//set app port
app.listen(2000);
