var express = require('express');
var router = express.Router();
var queries = require('./dao');

/**Error Message  */
var errorMessage ={
  type: "error",
  descriptions :{
    errorCode : 400,
    message : ""
  }
};

/* Root Url : HOME PAGE */
router.get('/', function(req, res) {
  var home ={
    Message : 'Welcome to Home Page'
  };
  res.send(home);
});

/** Method will provide employees details*/
router.get('/empDetails', function(req, res) {
  console.log(JSON.stringify(req.headers));
  queries.getEmpRecords(function(details){
    if(details == undefined){
      unknownError(res);
      return;
    }
    if(details.length == 0){
      var error = errorMessage;
      error.descriptions.errorCode = "400";
      error.descriptions.message = "No employee record exists";
      res.status(400).send(error);
      return;
    }
    var response = {};
    response.EmpDetails =details;
  res.send(response);
 });
});

/**Method will provide employee details by empId */
router.get('/empDetails/:id',function(req,res){
  var empid = req.params.id;
  queries.getEmpDetails(empid,function(record){
    if(record == undefined){
      unknownError(res);
      return;
    }
    if(record.length ==0){
      var error = errorMessage;
      error.descriptions.errorCode = "400";
      error.descriptions.message = "No record found for the empid provided";
      res.status(400).send(error);
      return;
    }
    
    res.send(record);
  });
});

/**Method will add a employee record */
router.post('/addEmployee', function(req, res){

    try{
          if(req.body.empId.length > parseInt(req.body.empId).toString().length){
            var error = errorMessage;
          error.descriptions.errorCode = "400";
          error.descriptions.message = "Please provide a valid employee id";
          res.status(400).send(error);
          return;
          }
    }
    catch(err){
      unknownError(res);
      return
    }
  queries.addEmployee(req, function(status){
    if(status){
      res.send("message: Employee added successfully");
    }
    else{
      res.send("message: duplicate insertion in not allowed");
      return;
    }

  });
});

/** Method will send a 500 error is the error type is not recognized */
function unknownError(res){
      var error = errorMessage;
      error.descriptions.errorCode = "500";
      error.descriptions.message = "Internal error occurred";
      res.status(500).send(error);
}
module.exports = router;
