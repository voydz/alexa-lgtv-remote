var lgtv = require("lgtv2");

var Remote = function(connector) {
  this.connector = connector;
}

Remote.prototype.turnOn = function(callback) {
  this._request('ssap://system/turnOn', function(err, res, tv) {
    if (callback) callback(err, res)
  })
}

Remote.prototype.turnOff = function(callback) {
  this._request('ssap://system/turnOff', function(err, res, tv) {
      // Auto disconnect.
      tv.disconnect()

      if (callback) callback(err, res)
  })
}

Remote.prototype._request = function(command, callback) {
  // Check device connection.
  this._connectedOrFail();

  // Execute request on device.
  connector.tv.request(command, function(err, res) {
      // Custom callback.
      if (callback) callback(err, res, connector.tv)
  })
}

Remote.prototype._connectedOrFail = function() {
  if (!this.connector.connected)
    throw new Error('device not connected')
}

module.exports = Remote;
