var base64JS = require('./base64');

var encoded = base64JS.encode("TEST123");
var decoded = base64JS.decode("VEVTVDEyMw==");
console.log('Encoded: ' + encoded);
console.log('Decoded: ' + decoded);