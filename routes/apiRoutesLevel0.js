'use strict'
let express = require('express');
let apiRoutesLevel0 = express.Router();
let token = require('../mytoken');

let apiRoutesLevel1=require('../routes/apiRoutesLevel1');
let apiRoutesLevel2=require('../routes/apiRoutesLevel2');
let apiRoutesLevel3=require('../routes/apiRoutesLevel3');

module.exports = function(){
    
    apiRoutesLevel0.use(function(req, res, next){
       //token verification, token is in url or no token
        //let myToken=req.headers['x-access-token'];
        //console.log(myToken);
        let myToken=req.cookies['access_token'];        
        
        if(!myToken){
            //there is no token, user unauthorized
            return res.json({
                        success: false,
                        message: 'User is not authorized - no token provided'
                    });
        } 
        else{
            //token provided
            token.verify(myToken, function(err, decoded){
                if(err){
                    return res.status(401).json({
                                success: false,
                                status: 'Failed to verify token'                  
                    });
                }
                else{
                    //token verified
                   // console.log("Decoded token:\n"+decoded.sub+"..."+decoded.permissions);
                    req.decodedToken = decoded;                         
                    next();
                }   
             });             
            }        
   });      
              
   apiRoutesLevel0.use('/1', apiRoutesLevel1());
   apiRoutesLevel0.use('/2', apiRoutesLevel2());
   apiRoutesLevel0.use('/3', apiRoutesLevel3());
                
   return apiRoutesLevel0;
}