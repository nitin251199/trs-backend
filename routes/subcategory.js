var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

  router.get('/fetchallsubcategories', function(req, res, next) {
 
    pool.query("select c.*,(select categoriesname from categories where categoriesid = c.categoryid ) as categoriesname from subcategories as c",function(error,result){
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

  router.post('/fetchallsubcategoriesbyid', function(req, res, next) {
 console.log(req.body)
    pool.query("select * from subcategories  where categoryid=? ",[req.body.categoryid],function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          console.log(result)
          res.status(200).json(result)
        }
      })
  });

  router.post('/insertsubcategories',upload.single("picture"), function(req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
    pool.query("insert into subcategories (categoryid,subcategoryname,picture) values(?,?,?)",
    [req.body.categoryid,req.body.subcategoryname,req.file.originalname],function(error,result){
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
  
  router.post('/deletesubcategories', function(req, res, next) {
    pool.query("delete from subcategories where subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error)
        {
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });
   

  router.post('/editicon',upload.single("picture"), function(req, res, next) {
    pool.query("update subcategories set picture=? where subcategoryid=?",[req.file.originalname,req.body.subcategoryid],function(error,result){
        if(error)
        {  console.log(error);
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/updatesubcategories', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("update subcategories set subcategoryname=? where subcategoryid=?",
    [req.body.subcategoryname,req.body.subcategoryid],function(error,result){
        if(error)
        { 
          res.status(500).json(false)
        }
        else
        { 
          res.status(200).json(true)
        }
      })
  });


module.exports = router;
