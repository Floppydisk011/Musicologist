"use strict";

 
var mysql = require('mysql2');

function setInstrument(instrument) {
  var connection, name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, image, category, imageData, MYSQLQUERY;
  return regeneratorRuntime.async(function setInstrument$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          connection = mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
          });
          name = instrument.name;
          price = instrument.price;
          description = instrument.description;
          feedback = instrument.feedback;
          brand = instrument.brand;
          dimensions = instrument.dimensions;
          weight = instrument.weight;
          quantity = instrument.quantity;
          image = instrument.image;
          category = instrument.category;
          imageData = Buffer.from(image.split(',')[1], 'base64');
          MYSQLQUERY = "INSERT INTO instruments (name, price, description, feedback, brand, dimensions, weight, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          _context.next = 20;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, dimensions, weight, quantity, imageData, category]));

        case 20:
          if (!_context.sent) {
            _context.next = 23;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 23:
          _context.next = 30;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 25]]);
}

module.exports = setInstrument;