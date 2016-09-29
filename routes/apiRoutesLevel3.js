'use strict'
let express = require('express');
let apiRoutes = express.Router();

module.exports = function(){
    
    apiRoutes.use(function(req, res, next){
       //permission verification
       // console.log('Just another middleware...');
       // console.log(req.decodedToken);
        if( req.decodedToken.permissions == 3 ){
            next();
        }
        else{
            //user authenticated but unauthorized
            return res.status(403).json({
                success: false,
                status: "User unauthorized...Need level 3"
            })
        }     
   });      
              
   apiRoutes.get('/api', function(req, res,next){
       res.status(200).json({
           success: true,
           message: "You entered restricted area with permission 3"
       })
   });
   
   apiRoutes.get('/list', function(req, res, next){
        res.status(200).json({
           success: true,
           message: "You entered restricted area with permission 3"
       })
   });
                      
   return apiRoutes;
}