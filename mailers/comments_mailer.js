const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log("inside newComment mailer");

    nodeMailer.transporter.sendMail({
        from : 'pavan.sadhguna@gmail.com',
        to : comment.user.mail,
        subject : "New Comment published",
        html : '<h1> Yup, Your comment is now published </h1>'
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}