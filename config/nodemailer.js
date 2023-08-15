const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const environment = require('./environment');

let transporter = nodemailer.createTransport(environment.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){
                console.log('error in rendering template',err);
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    renderTemplate : renderTemplate,
    transporter : transporter
}