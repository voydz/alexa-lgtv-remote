var lgtv = require('lgtv2')
var wol = require('wake_on_lan')
var Remote = require('./remote')

var Connector = function(config) {
  this.config = config || {
    url: process.env.TV_SOCKET
  }

  this.connected = false
}

Connector.prototype.wake = function(callback) {
  wol.wake(process.env.TV_MAC, callback)
}

Connector.prototype.connect = function(callback) {
  // Connect to the device.
  this.tv = lgtv(this.config)

  var self = this
  this.tv.on('connect', function () {
    // Set connection state.
    self.connected = true

    // Call the callback with the remote.
    if (callback) callback(new Remote(self))
  })
}

Connector.prototype.disconnect = function(callback) {
  // Disconnect from device.
  this.tv.disconnect();

  var self = this
  this.tv.on('disconnect', function () {
    // Set connection state.
    self.connected = false

    // Call the callback with the remote.
    if (callback) callback()
  })
}

module.exports = Connector;
