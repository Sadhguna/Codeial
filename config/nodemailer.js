import nodemailer from 'nodemailer';
import ejs from 'ejs';
import { join } from 'path';
import environment from './environment.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let transporter = nodemailer.createTransport(environment.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        join(__dirname,'../views/mailers',relativePath),
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

export default {
    transporter: transporter,
    renderTemplate: renderTemplate
}