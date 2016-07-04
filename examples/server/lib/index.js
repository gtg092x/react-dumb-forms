'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 5000;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sT0FBTyxJQUFiOztBQUVBLElBQU0sTUFBTSx3QkFBWjs7QUFFQSxJQUFJLEdBQUosQ0FBUSxxQkFBVyxJQUFYLEVBQVI7O0FBRUEsSUFBSSxHQUFKLENBQVEsR0FBUixFQUFhLFVBQVUsR0FBVixFQUFlLEdBQWYsRUFBb0I7QUFDL0IsTUFBSSxJQUFKLENBQVMsY0FBVDtBQUNELENBRkQ7O0FBSUEsSUFBSSxNQUFKLENBQVcsSUFBWCxFQUFpQixZQUFZO0FBQzNCLFVBQVEsR0FBUixvQ0FBNkMsSUFBN0M7QUFDRCxDQUZEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbmNvbnN0IFBPUlQgPSA1MDAwO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5hcHAuZ2V0KCcvJywgZnVuY3Rpb24gKHJlcSwgcmVzKSB7XG4gIHJlcy5zZW5kKCdIZWxsbyBXb3JsZCEnKTtcbn0pO1xuXG5hcHAubGlzdGVuKFBPUlQsIGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2coYEV4YW1wbGUgYXBwIGxpc3RlbmluZyBvbiBwb3J0ICR7UE9SVH0hYCk7XG59KTtcbiJdfQ==