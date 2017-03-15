var Connector = require('./api/connector')

var Promise = require('promise')
var alexa = require("alexa-app")
var app = new alexa.app("lgtv-remote")

var connector = new Connector()
var remote = null
connector.connect(function(res) {
  remote = res
})

// app.launch(function(request, response) {
//   if (remote) return
//
//   // Connect and attach remote handle.
//   connector.connect(function(remote) {
//     remote = remote
//   })
// })
//
// app.sessionEnded(function(request, response) {
//   // Disconnect and close remote handle.
//   connector.disconnect(function(remote) {
//     remote = null
//   })
//
//   // cleanup the user's server-side session
//   logout(request.userId)
// })

app.intent("TurnDeviceOn", {
    "slots": {},
    "utterances": [
      "{schalte|mache} {fernseher|tv|glotze} {an|ein}",
    ]
  },
  function(request, response) {
    console.log('turn device on')
    var turnOn = new Promise(function(fulfill, reject) {
      connector.wake(function(err) {
        if (err) reject(err)
        else fulfill()
      })
    })

    return turnOn
      .then(function() {
        return response.say('OK.')
      }, function (err) {
        console.log(err)
        return response.say('Es ist ein problem mit dem gerät aufgetreten.')
      })
  }
)

app.intent("TurnDeviceOff", {
    "slots": {},
    "utterances": [
      "{schalte|mache} {fernseher|tv|glotze} aus",
    ]
  },
  function(request, response) {
    console.log('turn device off')
    var turnOff = new Promise(function(fulfill, reject) {
      remote.turnOff(function(err, res) {
        if (err) reject(err)
        else fulfill(res)
      })
    })

    return turnOff
      .then(function(res) {
        return response.say('OK.')
      }, function (err) {
        console.log(err)
        return response.say('Es ist ein problem mit dem gerät aufgetreten.')
      })
  }
)

module.exports = app
