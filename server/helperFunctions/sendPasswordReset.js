import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();
/**
 * @description it sends email to user for password reset details
 * @param {string} email 
 * @param {string} password 
 * @returns {object} message
 */
export const sendPasswordReset = (email, password) => {
  nodemailer.createTestAccount(() => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_NAME, // app bot email
        pass: process.env.PASSWORD // app bot password
      }
    });
    // setup email data with unicode symbols
    const mailOptions = {
      from: '<tosmakbadguy31@gmail.com>', // sender address
      to: email.toString(), // list of receivers
      subject: 'Password Reset Notification', // Subject line
      html: `<div style="background-color: #fbfbd287">
              <p> 
              <strong>Hello Books</strong>
              </p>
              <p> 
              <strong>Hello,</strong>
              </p>
              <p>
                your password has been reset
                you can login with this password ${password}
              </p>
              </div>` // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return `Message sent: %s${info.messageId}`;
      // Example Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    });
  });
};
export default sendPasswordReset;
