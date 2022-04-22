import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import config from '../config/config';

const { EMAIL, PASSWORD } = config;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: EMAIL, pass: PASSWORD },
});

/**
 * @description: This function sends an email to the specified email address
 * @param {string} to: The email address to which the email is to be sent
 * @param {string} subject: The subject of the email
 * @param {string} html: The html content of the email
 * @returns {Promise<SMTPTransport.SentMessageInfo>}
 */

const sendEmail = (
  to: string,
  subject: string,
  html: string,
): Promise<SMTPTransport.SentMessageInfo> => {
  const mailOptions = {
    from: EMAIL,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
