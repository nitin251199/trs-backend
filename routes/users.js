var express = require('express');
var router = express.Router();
var pool = require('./pool')

/* GET users listing. */
router.get('/fetchallusers', function (req, res, next) {

  pool.query("select * from userrecords", function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json({ data: result })
    }
  })
});

router.post('/insertuser', function (req, res, next) {
  console.log("BODY:", req.body);
  pool.query("insert into userrecords (firstname, lastname, gender, dob, address1, address2, city, zipcode, state, country, firmname, website, mobileno, emailid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [req.body.firstname, req.body.lastname, req.body.gender, req.body.dob, req.body.addressone, req.body.addresstwo, req.body.city, req.body.zipcode, req.body.state, req.body.country, req.body.firmname, req.body.website, req.body.mobileno, req.body.emailid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});

router.post('/updateuserdata', function (req, res, next) {
  console.log("BODY:", req.body);
  pool.query("update userrecords set firstname=?, lastname=?, gender=?, dob=?, address1=?, address2=?, city=?, zipcode=?, state=?, country=?, firmname=?, website=?, mobileno=?, emailid=? where clientid=?", [req.body.firstname, req.body.lastname, req.body.gender, req.body.dob, req.body.address1, req.body.address2, req.body.city, req.body.zipcode, req.body.state, req.body.country, req.body.firmname, req.body.website, req.body.mobileno, req.body.emailid, req.body.clientid], function (error, result) {
    if (error) {
      console.log(error)
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});


router.post('/deleteuser', function (req, res, next) {
  pool.query("delete from userrecords where clientid=?", [req.body.clientid], function (error, result) {
    if (error) {
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
});

module.exports = router;
