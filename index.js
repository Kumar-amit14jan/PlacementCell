const express = require('express');
const port =process.env.PORT || 8080;
const app = express();
app.listen(port , function(error){
    if(error){
        console.log("Error in running Server");
    }
    console.log("Server is running");
});