const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine','ejs');
app.set('views' , './views');
  

// app.get('/',function(req,res){
//     return res.render('user_sign_in');
// })

//sessional cookie
app.use(session({
    name : 'codeial',
    secret : 'blahsomething',
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

app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})