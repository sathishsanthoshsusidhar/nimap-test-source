// Product.route.js
const express = require('express');
//const app = express();
const productRoutes = express.Router();

// Defined store route
productRoutes.route('/add').post(function (req, res) {
  db.connect(function(err) {
    var productName = req.body.productName;
    var category = req.body.category;
    var sql = "INSERT INTO `products` (`productName`, `category`) VALUES ('"+productName+"', '"+category+"');";
  db.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({'msg': 'Product in added successfully'});
  });
});
});

// Defined get data(index or listing) route
productRoutes.route('/list/:currentPage/:pageSize').get(function (req, res) {
  console.log(req.params);
  var currentPage = (req.params.currentPage > 0 && !isNaN(req.params.currentPage))?req.params.currentPage:1;
  var fromCount = req.params.currentPage * req.params.pageSize;
  var pageSize = req.params.pageSize;
  db.connect(function(err) {
    db.query("SELECT p.id as _id, p.productName as productName, c.categoryName as category FROM products as p LEFT JOIN categories as c on c.id=p.category  LIMIT "+fromCount+','+pageSize, function (err, result, fields) {
      if (err) throw err;
       res.json(result);
    });
  });
});

// Defined edit route
productRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  db.connect(function(err) {
    db.query("SELECT p.id as _id, p.productName as productName, p.category as category FROM products as p WHERE p.id ="+id, function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  });
});

//  Defined update route
productRoutes.route('/update/:id').post(function (req, res) {
  var id = req.params.id;
  db.connect(function(err) {
    var productName = req.body.productName;
    var category = req.body.category;
    sql = "UPDATE products SET productName ='"+productName+"',category='"+category+"' WHERE id ="+id;
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.json({'msg': 'Product updated successfully'});
    });
  });
});

// Defined delete | remove | destroy route
productRoutes.route('/delete/:id').get(function (req, res) {
  var id = req.params.id;
  db.connect(function(err) {
    var sql = "DELETE FROM products WHERE id = '"+id+"'";
    db.query(sql, function (err, result) {
      if (err) throw err;
      res.json({'msg': 'Product updated successfully'});
    });
  });
});

module.exports = productRoutes;
