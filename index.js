const express = require('express');
const expressLayout = require('express-ejs-layouts');
const env = require('./config/environment');
const port = process.env.PORT|| 8000;
const app = express();
const db = require(env.db_path);
const flash = require('connect-flash');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require(env.passport_path);
const customMware = require(env.customMware_path);
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayout);
app.use(express.static(env.assets_path));
app.use(session({
    name: 'placementCell',
    secret: env.secret_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:mongoStore.create({
        mongoUrl :env.mongoose_path,
        ttl: 14 * 24 * 60 * 60
    })
    }

));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./route/index'));
app.listen(port, function (error) {
    if (error) {
        console.log("Error in running Server");
    }
    console.log("Server is running");
});