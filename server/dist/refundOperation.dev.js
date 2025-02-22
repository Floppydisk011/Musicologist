"use strict";

var mysql = require('mysql2');

function refundOperation(id) {
  var connection, MYSQLQUERY;
  return regeneratorRuntime.async(function refundOperation$(_context) {
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
          MYSQLQUERY = "UPDATE sales SET sales.paymentState = \"Refunded\" WHERE sales.id = ".concat(id);
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY));

        case 5:
          if (!_context.sent) {
            _context.next = 8;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 8:
          _context.next = 15;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

module.exports = refundOperation;