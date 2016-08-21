var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var connection = require('pg-promise')(options);
var conDetails = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'nodejs',
    user: 'postgres',
    password: 'system'
};
var con = connection (conDetails);

function getEmpDetails(callback){
 con.query('select * from employee').
  then(function(data){
    callback(data);
  }).
  catch(function(err){
    callback({SearchResult: 'No Record Found'});
  });
}

function searchEmployee(id,callback){
  console.log("Id is ",id);
  con.query("select * from employee where emp_id = $1",[id]).
  then(function(data){
     callback(data);
  }).
  catch(function(err){
  callback({SearchResult:'Record not Found for empid'+id});
  });
  }

module.exports = {
  getEmpDetails:getEmpDetails,
  searchEmployee:searchEmployee
};

