var lgtv = require("lgtv2");

var Remote = function(connector) {
  this.connector = connector;
}

Remote.prototype.turnOff = function(callback) {
  this.request('ssap://system/turnOff', function(err, res, tv) {
      if (callback) callback(err, res)

      // Auto disconnect.
      tv.disconnect()
  })
}

Remote.prototype.request = function(command, callback) {
  // Check device connection.
  this.connectedOrFail();

  // Execute request on device.
  this.connector.tv.request(command, function(err, res) {
      // Custom callback.
      if (callback) callback(err, res, connector.tv)
  })
}

Remote.prototype.connectedOrFail = function() {
  if (!this.connector.connected)
    throw new Error('device not connected')
}

module.exports = Remote;
