"use strict";

 
var mysql = require('mysql2');

function updateServices(id) {
  var connection, MYSQLQUERY;
  return regeneratorRuntime.async(function updateServices$(_context) {
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
          MYSQLQUERY = "UPDATE services SET quantity = quantity - 1 WHERE id = ".concat(id);
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY));

        case 5:
          if (!_context.sent) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", {
            success: true
          });

        case 7:
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

module.exports = updateServices;