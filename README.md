# Alexa LG TV Remote [![Build Status](https://travis-ci.org/voydz/alexa-lgtv-remote.svg?branch=master)](https://travis-ci.org/voydz/alexa-lgtv-remote)

This is the english fork for voydz's original German version [here](https://github.com/voydz/alexa-lgtv-remote).
Control your webOS powered LG TV with amazon's alexa. 

## Getting Started

First of all the setup of this skill does require some  amount of developer knowledge, as I am not able to cover everything here. This project consists of a NodeJS HTTP/S webserver in your local network (but has to be reachable by Amazons ASK Services). It handles incoming requests from Alexa and locally communicates with your LG TV.

1. [Create your own Alexa app in Amazons developer center.](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/registering-and-managing-alexa-skills-in-the-developer-portal#register-a-new-skill)

    * **to Step 4.** Only english is supported in this version, (but it can be easily customized, see `src/app.js`)
    * **to Step 6.** You can choose the name and invocation name as you wish. Keep in mind, that the invocation name is the 'activation phrase' for the skill.
    * **to Step 7.** This skill does *NOT* use Alexa's AudioPlayer Interface
    * **to Step 8.** Those assets are generated and can be found in the `speechAssets/` directory.
    * **to Step 9.** 
    	1) As this skill does boot up an HTTP/S server, that is what we want to use.
    	2) This endpoint needs to be accessible from Amazon's servers, you can use [ngrok](https://ngrok.com/) or another hosted solution that can also access the local node server running. If using ngrok, endpoint will have naming convention `https://<id>.ngrok.io/lgtv-remote` to reflect calling of the app. 
   * **to Step 12.** if using ngrok from step 9, select `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority` 

2. Install all dependencies with `npm install`.

3. Configure your environment. First `cp .env.example .env`, then manipulate the values in `.env`.

    * **PORT** the port the webserver will run on.
    * **TV_MAC** mac address of your LG TV (used for wake on lan)
    * **TV_SOCKET** ip/host socket connection (used for remote control)

4. Run the app with `npm run start`.

5. Make sure the service connect's to your TV correctly (if it is turned on of course). Then check if the webserver is reachable from Amazon's ASK. It *HAS TO BE* using HTTPS. You can test connectivty through Amazon's developer center.

## Command Line Interface

Make sure you call them from project root. Instead of `npm` you can use `yarn` of course. For all commands check the `scripts` section in `package.json`.

* `npm run start`
 builds and runs the app

* `npm run docs`
builds the app and generates the speechAssets

## Implemented Features

* [x] Turn on/off device
* [ ] Volume status, turn up/down
* [x] Mute/unMute tv
* [x] Media player play/pause/close
* [x] Launch apps
* [x] Switch inputs
