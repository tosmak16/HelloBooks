import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwtDecode from 'jwt-decode';


dotenv.config();
/**
 * @description it handles sending email notification to admin when a user borrows
 * or returns a book
 * @param {string} token 
 * @param {string} emailMessage 
 * @returns {object} message
 */
export const sendMail = (token, emailMessage) => {
  const decodedToken = jwtDecode(token);
  const { email, user } = decodedToken;
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
      subject: 'HelloBooks Notification', // Subject line
      html: `<div style="background-color: #fbfbd287">
              <p> 
              <strong>Hello Books</strong>
              </p>
              <p> 
              <strong>Hello Admin,</strong>
              </p>
              <p>
              ${user} ${emailMessage.toLowerCase()}
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
export default sendMail;
