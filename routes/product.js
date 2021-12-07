var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");



router.post('/insertproduct',upload.single("picture"), function(req, res, next) {
   
    pool.query("insert into products (productname,description,picture) values(?,?,?)",
    [req.body.productname,req.body.discription,req.file.originalname],function(error,result){
        if(error)
        { console.log(error)
         
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.get('/fetchallproduct', function(req, res, next) {
 
    pool.query("select * from products",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });
  
  

  module.exports = router;