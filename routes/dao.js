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
 con.any('select * from employee').
  then(function(data){
    callback(data);
  }).
  catch(function(err){
    console.log(err);
  });
}

module.exports = {
  getEmpDetails:getEmpDetails
};

