const express = require('express');
const expressLayout = require('express-ejs-layouts');
const port =process.env.PORT || 8000;
const app = express();
const db= require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
app.use(express.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.set('views' , './views');
app.use(expressLayout);
app.use(express.static('./assets'))
//use session
app.use(session({
    name :'placementCell',
    secret:'placementCell',
    saveUninitialized:false,
    resave:false,
    cookie :{
        maxAge :(1000 * 60 * 100)
    }

}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/' , require('./route/index'));
app.listen(port , function(error){
    if(error){
        console.log("Error in running Server");
    }
    console.log("Server is running");
});