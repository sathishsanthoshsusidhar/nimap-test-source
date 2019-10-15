// server.js
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');
const mysql = require('mysql');
const categoryRoute = require('./routes/category.route');
const productRoute = require('./routes/product.route');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MT"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

global.db = con;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/category', categoryRoute);
app.use('/product', productRoute);
const port = process.env.PORT || 1500;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
