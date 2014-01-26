#!/usr/bin/env node

// pass email subject as first argument and email body as second argument

var email = {
  service: 'Gmail',
  user: process.argv[4] || process.env['GMAIL_USER'],
  password: process.argv[5] || process.env['GMAIL_PASSWORD'],
  from: process.argv[6] || process.env['GMAIL_FROM'],
  to: process.argv[7] || process.env['GMAIL_TO'],
  subject: process.argv[2] || '',
  text: process.argv[3] || ''
};

var smtpTransport = require('nodemailer').createTransport('SMTP', {
  service: email.service,
  auth: {
    user: email.user,
    pass: email.password
  }
});

smtpTransport.sendMail({
  from: email.from,
  to: email.to,
  subject: email.subject,
  text: email.text
}, function (err, res){

  if (err) {
    return console.error(err);
  }

  console.log(res.message);

  smtpTransport.close();

});