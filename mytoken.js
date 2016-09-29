'use strict'
var crypto=require('bcrypt-nodejs');
var saltRounds=10;
var jwt=require('jsonwebtoken');

var uuid=require('node-uuid');

let secretKey=uuid.v4();

module.exports.secretKey = secretKey;

module.exports.create = function(user, permission){
    
    //let timeStampNow=Date.now();    
    //let timeToExpire=timeStampNow;
    
    var claims = {
        sub: user,
        iss: 'https://i_issued_this.com',
        permissions: permission
        //set exp if !never to expire
        //exp: timeToExpire
    };
    
    
    var token=jwt.sign(claims, secretKey);
    console.log('\nToken created...\n'+token);
            
    return token;
};

module.exports.verify = function(token, callback)
{
    //verify token, return claims or 'error'
    console.log('From verify\n'+token);
            
    jwt.verify(token, secretKey, callback);      
};
