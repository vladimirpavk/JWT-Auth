//ovo je prava aplikacija za proveru permissions i username
'use strict'
let express=require('express');
let app=express();

let morgan=require('morgan');
app.use(morgan('dev'));

let users=require('./users/auth-user');

//let Cookies=require('cookies');
let token=require('./mytoken');

let apiRoutes=require('./routes/apiRoutes');
app.use('/', apiRoutes());

let port=3033;
app.listen(port);
console.log('Server listening on: '+port);