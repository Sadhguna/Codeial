const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');


const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory 
});   

const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db : 'codeial_development',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'pavan.sadhguna@gmail.com',
            pass : 'dohiddiwrwghtdgf'
        }
    },
    google_client_id : "930257139966-g74rcp0nc1avejmj9u04hm36bad6rjul.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : 'http://localhost:8000/users/auth/google/callback',
    jwt_secret : 'codeial',
    morgan :{
        mode : 'development',
        options : {stream : accessLogStream}
    }

}

const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.CODEIAL_GMAIL_USERNAME,
            pass : process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan :{
        mode : 'combined',
        options : {stream : accessLogStream}
    }
}
//module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);