import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'mainUser',
      password: 'password'
    }
  },
  options: {
    trustServerCertificate: true,
    trustedConnection: true
    }
}

var connection = new Connection(config);

connection.connect();

var arr: any[] =[];

function executeStatement() {
    var request = new Request("select * from books ", function(err, rowCount) {
      if (err) {
        console.log(err);
      } 
    }); 
    request.addOutputParameter('username', TYPES.VarChar);
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        arr.push(column.value)
      });
      console.log(arr);
    });
    
    connection.execSql(request);
  }
  

connection.on('connect', function(err){
    if(err){
        console.log(err);
    }
    else{
        executeStatement();
    }
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);
app.get( "/test", ( req, res ) => {
    res.send( arr );
} );