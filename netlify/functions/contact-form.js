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
  const formValue = await req.json();
  console.log('formValue', formValue)

  return new Response(`You're visiting }!`);
};

// export const config = {
//   path: "/contact-form/:city"
// };

// exports.handler = async (request, context) => {
// export default async (request, context) => {
//   const formValue = await request.json();
//   const formValueText = await request.text();
//   console.log('request json:', formValue); // This is already a string
//   console.log('request text:', formValueText); // This is already a string
//   const data = JSON.parse(request.body);
//   console.log('Parsed data:', data);
//   return new Response('Ok!!', { status: 200 });
// };
