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
  console.log('env GMAIL_USER', process.env.GMAIL_USER)
  console.log('env GMAIL_APP_PASSWORD', process.env.GMAIL_APP_PASSWORD)
  await sendEmail(formValue);
  return new Response(`Ok`);
};

