"use strict";


var nodemailer = require('nodemailer');

function contactRequest(firstName, lastName, email, message) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function contactRequest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "musicologist.business@gmail.com",
              pass: "Musicologist01"
            }
          });
          mailOptions = {
            from: "musicologist.business@gmail.com",
            to: 'musicologist.business@gmail.com',
            subject: firstName + ' ' + lastName + ' ' + email,
            text: message
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error('Error sending email: ', error);
              return {
                success: false
              };
            } else {
              console.log("Email sent successfully: ", info.response);
              return {
                success: true
              };
            }
          }));

        case 5:
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

module.exports = contactRequest;