var lgtv = require('lgtv2')
var Remote = require('./remote')

var Connector = function(config) {
  this.config = config || {
    url: process.env.DEVICE_URL
  }

  this.connected = false
}

Connector.prototype.connect = function(callback) {
  // Connect to the device.
  this.tv = lgtv(this.config)

  this.tv.on('connect', function () {
    // Set connection state.
    this.connected = true

    // Call the callback with the remote.
    if (callback) callback(new Remote(self))
  }).bind(this)
}

Connector.prototype.disconnect = function(callback) {
  // Disconnect from device.
  this.tv.disconnect();

  this.tv.on('disconnect', function () {
    // Set connection state.
    this.connected = false

    // Call the callback with the remote.
    if (callback) callback()
  }).bind(this)
}

module.exports = Connector;
