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
  try {
    const formValue = await req.json();
    await sendEmail(formValue);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

