'use strict'
let express = require('express');
let apiRoutes = express.Router();

module.exports = function(){
    
    apiRoutes.use(function(req, res, next){
       //permission verification
       // console.log('Just another middleware...2');
       // console.log(req.decodedToken);
        if( req.decodedToken.permissions == 1 ){
            next();
        }
        else{
            //user authenticated but unauthorized
            return res.status(403).json({
                success: false,
                status: "User unauthorized...Need level 1"
            })
        }     
   });      
              
   apiRoutes.get('/api', function(req, res,next){
       res.status(200).json({
           success: true,
           message: "You entered restricted area with permission 1"
       })
   });
   
   apiRoutes.get('/list', function(req, res, next){
       res.status(200).json({
           success: true,
           message: "You entered restricted area with permission 1"
       })
   });
                      
   return apiRoutes;
}