import nodemailer from "nodemailer";
const MailSenderProviderBrevo = nodemailer.createTransport({
  host: `smtp-relay.brevo.com`,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "7faebe002@smtp-brevo.com",
    pass: `${process.env.BREVO_SMTP_PASSWORD}`,
  },
});

export default MailSenderProviderBrevo;
