var smtpTransport = require('nodemailer').createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: process.env['GMAIL_USER'],
    pass: process.env['GMAIL_PASSWORD']
  }
});

// save score results to disk
var sendEmail = function (subject, html, text) {

  smtpTransport.sendMail({
    from: process.env['GMAIL_FROM'],
    to: process.env['GMAIL_TO'],
    subject: subject,
    html: html,
    text: text
  }, function (err, res){

    if (err) {
      return console.error(err);
    }

    // smtpTransport.close();

    return console.log(res.message);

  });

};

module.exports = sendEmail;