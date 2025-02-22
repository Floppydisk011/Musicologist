"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mysql = require('mysql2');

function getTotalInstruments() {
  var connection, MYSQLQUERY, _ref, _ref2, rows, row, instrumentNum, instrumentValue;

  return regeneratorRuntime.async(function getTotalInstruments$(_context) {
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
          MYSQLQUERY = "SELECT (instruments.price) as totalInstruments, SUM(instruments.quantity) as instrumentNum FROM instruments";
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 11;
            break;
          }

          console.log("Non ci sono risultati...");
          return _context.abrupt("return", {
            success: false,
            instrumentNum: null,
            instrumentValue: null
          });

        case 11:
          row = rows[0];
          instrumentNum = row.instrumentNum;
          instrumentValue = row.totalInstruments;
          _context.next = 16;
          return regeneratorRuntime.awrap(connection.end());

        case 16:
          return _context.abrupt("return", {
            success: true,
            instrumentNum: instrumentNum,
            instrumentValue: instrumentValue
          });

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

module.exports = getTotalInstruments;