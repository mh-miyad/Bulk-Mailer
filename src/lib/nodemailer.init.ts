import nodemailer from "nodemailer";
const MailSenderProvider = nodemailer.createTransport({
  host: `${process.env.MAIL_HOST_2}`,
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: `${process.env.MAIL_USER_2}`,
    pass: `${process.env.MAIL_SMTP_PASSWORD}`,
  },
});
// const MailSenderProvider = nodemailer.createTransport({
//   host: `${process.env.MAIL_HOST}`,
//   port: 465,
//   secure: true, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "resend",
//     pass: `${process.env.MAIL_PASS}`,
//   },
// });

export default MailSenderProvider;
