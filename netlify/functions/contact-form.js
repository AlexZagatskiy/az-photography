// const nodemailer = require('nodemailer');
//
// const transporter = nodemailer.createTransporter({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD
//   }
// });
//
// async function sendEmail(data) {
//   await transporter.sendMail({
//     from: process.env.GMAIL_USER,
//     to: 'your-email@domain.com',
//     replyTo: data.email,
//     subject: `Contact Form: ${data.subject}`,
//     html: `<h2>New Message from ${data.name}</h2><p>${data.message}</p>`
//   });
// }

export default async (req, context) => {
  const { city } = context.params;
  console.log('sending email:', context.body, city);

  return new Response(`You're visiting ${city}!`);
};

export const config = {
  path: "/contact-form"
};
