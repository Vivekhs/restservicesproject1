var express = require('express');
var router = express.Router();
var queries = require('./dao');

/* GET users listing. */
router.get('/', function(req, res) {
  var home ={
    Message : 'Welcome to Home Page '
  };

  res.send(home);
  console.log("Root Entered");
});
router.get('/getDetails', function(req, res) {
  console.log(JSON.stringify(req.headers));
  queries.getEmpDetails(function(details){
    var response ={};
    response.EmpDetails =details;
  res.send(response);
 });
});

router.get('/empDetails/:id',function(req,res){
  var empid = req.params.id;
  console.log(empid);
  queries.searchEmployee(empid,function(record){
    res.send(record);
  });
})
module.exports = router;
