var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};

var connection = require('pg-promise')(options);
var conDetails = {
    host: '127.0.0.1', // server name or IP address;
    port: 5432,
    database: 'nodejs',
    user: 'postgres',
    password: 'system'
};
var con = connection (conDetails);

/**fetch all the employee records from db */
function getEmpRecords(callback){
 con.query('select * from employee').
  then(function(data){
    callback(data);
  }).
  catch(function(err){
    callback();
  });
}

/**
 * fetch employee record (including vehicle info) by empid 
 */
function getEmpDetails(id,callback){
  con.query("select e.emp_name, e.designation, e.email_id, ev.vehicle_id, ev.vehicle_reg_number from "+ 
  "employee e inner join emp_vehicle ev on e.emp_id=ev.emp_id where e.emp_id = $1",[id]).
  then(function(data){
     callback(data);
  }).
  catch(function(err){
  callback();
  });
  }

/** method will insert a employee record into the db */
function addEmployee(req, callback){
    req.body.empId = parseInt(req.body.empId);
    console.log(req.body.empId);
    con.query('insert into employee(emp_id, emp_name, designation, email_id, office_location) '+
    'values( ${empId}, ${empName}, ${designation}, ${emailId}, ${officeLocation})',req.body).
    then(function(){
      callback(true);
    }).
    catch(function(err){
    callback(false);
    });
}

module.exports = {
  getEmpRecords:getEmpRecords,
  getEmpDetails:getEmpDetails,
  addEmployee : addEmployee
}



