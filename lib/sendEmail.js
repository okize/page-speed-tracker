// modules
var path = require('path');
var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');

var emailTemplatesDir = path.join(__dirname, 'templates');
var smtpOptions = {
  service: 'Gmail',
  auth: {
    user: process.env['GMAIL_USER'],
    pass: process.env['GMAIL_PASSWORD']
  }
};
var smtpTransport = nodemailer.createTransport('SMTP', smtpOptions);

// sends email about scores
var sendEmail = function (subject, data) {

  emailTemplates( emailTemplatesDir, function (err, template) {

    if (err) { throw err; }

    // send the email
    template('resultsEmail', data, function (err, html, text) {

      if (err) { throw err; }

      smtpTransport.sendMail({
        from: process.env['GMAIL_FROM'],
        to: process.env['GMAIL_TO'],
        subject: subject,
        html: html,
        text: text
      }, function (err, res) {

        if (err) { throw err; }

        // close the connection
        smtpTransport.close();

        return console.log(res.message + ' => ' + new Date());

      });

    });

  });

};

module.exports = sendEmail;