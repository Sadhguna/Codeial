import nodeMailer from '../config/nodemailer.js';
import User from '../models/user.js';

export default {

    newPassword : function(data){
  
    let htmlString = nodeMailer.renderTemplate({data : data},'password_reset/password_reset.ejs');
    User.findById(data.user).then((data2)=>{
       nodeMailer.transporter.sendMail({
        from : 'pavan.sadhguna@gmail.com',
        to : data2.mail,
        subject : "Password Reset",
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
    }).catch((err)=>{
        console.log("error1",err);
    });
}
}