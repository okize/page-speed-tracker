var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: process.env['GMAIL_USER'],
    pass: process.env['GMAIL_PASSWORD']
  }
});

smtpTransport.sendMail({
  from: process.env['GMAIL_FROM'],
  to: process.env['GMAIL_TO'],
  subject: 'Ping',
  text: 'Pong'
}, function (err, res){
  if (err) {
    console.log(err);
  } else {
    console.log('Message sent: ' + res.message);
  }
});