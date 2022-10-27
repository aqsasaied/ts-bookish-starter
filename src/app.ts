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

function executeStatement() {
    var request = new Request("select * from books;", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        
      }
    });

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
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
