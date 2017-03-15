var Connector = require('./api/connector')

var promise = require('promise')
var alexa = require("alexa-app")
var app = new alexa.app("lgtv-remote")

var connector = new Connector()
var remote = null

app.launch(function(request, response) {
  // Connect and attach remote handle.
  connector.connect(function(remote) {
    remote = remote
  })
})

app.sessionEnded(function(request, response) {
  // Disconnect and close remote handle.
  connector.disconnect(function(remote) {
    remote = null
  })

  // cleanup the user's server-side session
  logout(request.userId)
})

app.intent("TurnDeviceOn", {
    "slots": {},
    "utterances": [
      "{schalte|mache} {fernseher|tv|glotze} {an|ein}",
    ]
  },
  function(request, response) {
    console.log('turn device on')

    return promise.denodify(remote.turnOn)
      .then(function() {
        return response.say('OK.')
      }, function () {
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

    return promise.denodify(remote.turnOff)
      .then(function() {
        return response.say('OK.')
      }, function () {
        return response.say('Es ist ein problem mit dem gerät aufgetreten.')
      })
  }
)

module.exports = app
