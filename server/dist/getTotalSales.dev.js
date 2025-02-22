"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var mysql = require('mysql2');

function getTotalSales() {
  var connection, currentDate, currentMonthNumber, currentMonthFormatted, MYSQLQUERY, _ref, _ref2, rows, row, total;

  return regeneratorRuntime.async(function getTotalSales$(_context) {
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
          currentDate = new Date();
          currentMonthNumber = currentDate.getMonth() + 1;
          currentMonthFormatted = currentMonthNumber.toString().padStart(2, '0');
          MYSQLQUERY = "SELECT SUM(sales.totalPrice) as total FROM sales WHERE MONTH(sales.saleDate) = ".concat(currentMonthFormatted, " AND sales.paymentState = \"Payment successful\"");
          _context.next = 8;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 8:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 14;
            break;
          }

          console.log("Non ci sono risultati...");
          return _context.abrupt("return", {
            success: false,
            data: null
          });

        case 14:
          row = rows[0];
          total = row.total;
          _context.next = 18;
          return regeneratorRuntime.awrap(connection.end());

        case 18:
          return _context.abrupt("return", {
            success: true,
            data: total
          });

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

module.exports = getTotalSales;