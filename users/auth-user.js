'use strict'

var users=require('./users');
var korisnici=users();

module.exports.authUser=function(username, password)
{
    let trazeni=korisnici.filter((item)=>{
        return item.name==username && item.password==password;
    })    
            
    return (trazeni.length > 0) ? 
      { 
        isAuthenticated: true,
        roleid: trazeni[0].roleid        
      } :
      {
        isAuthenticated: false
      };
}