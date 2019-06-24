"use strict";

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Starting the server
async function main() {
  await _server.default.listen(_server.default.get('port'));
  console.log(`Server on port ${_server.default.get('port')}`);
}

main();