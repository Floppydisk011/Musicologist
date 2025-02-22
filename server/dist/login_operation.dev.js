"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var mysql = require('mysql2/promise');

function loginOperation(usrn, psw) {
  var connection, MYSQLQUERY, _ref, _ref2, rows, row, email, username, password, id;

  return regeneratorRuntime.async(function loginOperation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mysql.createConnection({
            host: 'localhost',
            user: 'music',
            password: 'root',
            database: 'musicologist',
            port: '3306'
          }));

        case 3:
          connection = _context.sent;
          MYSQLQUERY = "SELECT idcustomer, username, email, password FROM customers WHERE customers.username=\"".concat(usrn, "\"  OR customers.email=\"").concat(usrn, "\"  ;");
          _context.next = 7;
          return regeneratorRuntime.awrap(connection.query(MYSQLQUERY));

        case 7:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 13;
            break;
          }

          console.log("Username o email errata");
          return _context.abrupt("return", {
            success: false
          });

        case 13:
          row = rows[0];
          email = row.email;
          username = row.username;
          password = row.password;
          id = row.idcustomer;

          if (!(password === psw)) {
            _context.next = 23;
            break;
          }

          console.log("Login effettuato correttamente");
          return _context.abrupt("return", {
            success: true,
            username: username,
            id: id
          });

        case 23:
          console.log("Password errata");
          return _context.abrupt("return", {
            success: false
          });

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](0);
          console.error("Errore durante l'operazione di login:", _context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 27]]);
}

module.exports = loginOperation;