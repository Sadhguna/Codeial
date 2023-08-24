import express from 'express';
import environment from './config/environment.js';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
const app = express();
import configureViewHelpers from './config/view-helpers.js';
configureViewHelpers(app);
const port = 8000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import expressLayouts from 'express-ejs-layouts';

import db from './config/mongoose.js';

import session from 'express-session';
import passport from 'passport';
import passportLocal from './config/passport-local-strategy.js';
import PassportJWT from './config/passport-jwt-strategy.js';
import passportGoogle from './config/passport-google-oauth2-strategy.js';

import MongoStore from 'connect-mongo';

import { join } from 'path';

import sassMiddleware from 'node-sass-middleware';

if(environment.name=='development'){
app.use(sassMiddleware({ 
    src : join(__dirname,environment.asset_path, 'scss'),
    dest : join(__dirname,environment.asset_path, 'css'),
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));
}

import flash from 'connect-flash';

import setFlash from './config/middleware.js';

import http from 'http';
import { chatSockets } from './config/chat_sockets.js';


const server = http.createServer(app);
const io = chatSockets(server);
//setup the char server to be used with socket.io
server.listen(5000);

console.log("chat server is listening on port 5000");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(environment.asset_path));
//makes the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(environment.morgan.mode, environment.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views' , './views');
  

// app.get('/',function(req,res){
//     return res.render('user_sign_in');
// })

//sessional cookie
app.use(session({
    name : 'codeial',
    secret : environment.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store : MongoStore.create(
    {
        mongoUrl : 'mongodb://127.0.0.1:27017/codeial_development',
        autoRemove : 'disabled'
    },function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(setFlash);

import routes from './routes/index.js';

app.use('/',routes);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})