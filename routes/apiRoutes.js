'use strict'
let express=require('express');
let bodyParser=require('body-parser');

let apiRoutesLevel0=require('./apiRoutesLevel0');
let users=require('../users/auth-user');
let token=require('../mytoken');

let cookieParser=require('cookie-parser');

module.exports=function(){
    
    let apiRoutes=express.Router();
    apiRoutes.use(bodyParser.urlencoded({
            extended: true
        }));
    
    apiRoutes.use(cookieParser('signed-with-secret-key'));
    
    apiRoutes.use('/restricted', apiRoutesLevel0());

    apiRoutes.post('/login', function(req, res){
            //console.log(req.body.username);
            //console.log(req.body.password);
            
            let authData=users.authUser(req.body.username, req.body.password);
           // console.log(authData);
                
            if( authData.isAuthenticated ){      
                //commented code is for production enviroment                                                     
                /*res.cookie('access-token', token.create(req.body.username, authData.roleid),{
                    httpOnly: true,
                    secure: true,
                    signed: true  
                }).status(200).json({
                    success: true,
                    status: "User authenticated...",
                    token: 'bivsi_token'
                });*/
                res.cookie('access_token', token.create(req.body.username, authData.roleid)).status(200).json({
                    success: true,
                    status: "User authenticated...",
                    token: 'bivsi_token'
                });                          
            }
            else{
                res.status(401).json({
                    success: false,
                    status: "User NOT authenticated..."           
                });  
            }      
    });    
    
    return apiRoutes;
}