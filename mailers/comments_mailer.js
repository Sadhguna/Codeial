import nodeMailer from '../config/nodemailer.js';


// this is another way of exporting a method
export default function newComment(comment) {
    let htmlString = nodeMailer.renderTemplate({comment : comment},'comments/new_comment.ejs');
    console.log(comment.user.mail);
    nodeMailer.transporter.sendMail({
        from : 'pavan.sadhguna@gmail.com',
        to : comment.user.mail,
        subject : "New Comment published",
        html : htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return;
        }
        console.log("message sent",info);
        return;
    });
}