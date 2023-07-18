import nodemailer from 'nodemailer'

export const sentEmail = async (req,res,next) => {
    const {gender, firstName, lastName, email, phone, topic, message} = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'ramzymika@gmail.com',
            pass: 'zhhexiviwlxrreoe'
        }
    })
    const mailOptions = {
        from: 'ramzymika@gmail.com',
        to: email,
        subject: topic,
        text: `Dear ${gender} ${firstName} ${lastName} \n We notice you Send Email to Michael Habib with this message ${message} \n Please Fell Free to contact us through \n Email Address : ramzymika@gmail.com, \n and on +201222353187`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          console.log(`Email sent: ${info.response}`);
          res.sendStatus(200);
        }
      });
    
}