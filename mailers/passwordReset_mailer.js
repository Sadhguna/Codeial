import nodeMailer from '../config/nodemailer.js';
import User from '../models/user.js';

export default {

    newPassword : function(data){
    //let mail;
    //let link = "http://localhost:8000/users/resetPassword/?token=data.token";
    let htmlString = nodeMailer.renderTemplate({data : data},'password_reset/password_reset.ejs');
    User.findById(data.user).then((data2)=>{
        
       // let mail = data2.mail;
       // console.log(mail);
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
    //console.log(mail);
    
}
}