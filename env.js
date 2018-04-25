const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = 'mongodb://rnce2018:ionut5002@ds219318.mlab.com:19318/rnce'; // Databse URI and database name
  process.env.databaseName = 'production database: rnce'; // Database name
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://rnce2018:ionut5002@ds219318.mlab.com:19318/rnce'; // Databse URI and database name
  process.env.databaseName = 'production database: rnce'; // Database name
}


process.env.Gmail = 'richardnolanapp@gmail.com';
process.env.GPass = 'ionut5002';