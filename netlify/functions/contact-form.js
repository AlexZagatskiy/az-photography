const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendEmail(data) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: 'alexzagatskiy@gmail.com',
    replyTo: data.email,
    subject: `AZ Photography`,
    html: `<h2>New Message from ${data.name}</h2><p>${data.message}</p>`
  });
}

export default async (req, context) => {
  const formValue = await req.json();
  await sendEmail(formValue);
  return new Response(`Ok`);
};

