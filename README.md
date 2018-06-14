

# Alexa LG TV Remote [![Build Status](https://travis-ci.org/voydz/alexa-lgtv-remote.svg?branch=master)](https://travis-ci.org/voydz/alexa-lgtv-remote) [![Greenkeeper badge](https://badges.greenkeeper.io/pparedes1/alexa-lgtv-remote.svg)](https://greenkeeper.io/)



Control your webOS powered LG TV with amazon's alexa. This is a small DIY smart home project born out of lazyness and curiosity. It currently supports English and German invocations to control your device. 

## Getting Started

First of all the setup of this skill does require some  amount of developer knowledge, as I am not able to cover everything here. This project consists of a NodeJS HTTP/S webserver in your local network (but has to be reachable by Amazons ASK Services). It handles incoming requests from Alexa and locally communicates with your LG TV.

1. [Create your own Alexa app in Amazons developer center (uses new interaction model).](https://developer.amazon.com/docs/devconsole/create-a-skill-and-choose-the-interaction-model.html)

    * **For Step 7.** Select Custom
    *   **Configure Your Skill** you will need to update several entries in the Interaction Model as below
        * **Invocation name** Select a name that you want Alexa to use when using app (Alexa, ask `myname` to do something). It defaults to `lgtv-remote`, however the model Invocation name may only contain alphabetic characters, apostrophes, periods and spaces.
        * **Configure Your Skill** Select JSON Editor under Interaction Model, and replace the contents with what's included in your `speechAssets/intentSchema.json`  file, then click `Save Model`.
        * **Slot types** Under slot types in the Interaction Model add at least 1 value for both `APP_IDS`(e.g. netflix, hulu, live, etc.) and `INPUT_IDS` (e.g. hdmi1, hdmi2), then click `Save Model`.
        *  **Build Model** Once saved, click Build Model
    *   **Endpoints** Select `Endpoint`* As this skill does boot up an HTTP/S server, that is what we want to use.
        * This Default Region endpoint needs to be accessible from Amazon's servers, you can use [ngrok](https://ngrok.com/) or another hosted solution that can also access the local node server running. If using ngrok, endpoint will have naming convention `https://<id>.ngrok.io/lgtv-remote` to reflect calling of the app. Similarly if using [heroku](https://www.heroku.com) or AWS, would need to specify the `lgtv-remote` application endpoint to enable Alexa to call this app.  
        * If using something like ngrok or heroku, select `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority` .
    * **Build Model** Select Custom
        
2. Install all dependencies with `npm install`.

3. Configure your environment. First `cp .env.example .env`, then manipulate the values in `.env`.

    * **PORT** the port the webserver will run on.
    * **TV_MAC** mac address of your LG TV (used for wake on lan)
    * **TV_SOCKET** ip/host socket connection (used for remote control)
    * **CALLHOME** URL to enable the application to remain 'active' on server
    * **LGDEBUG** setting  this value will trigger more output for debugging purposes to the console (optional)
    * **LANGUAGE** currently only supports constants `en` for English or `de` for German. By changing the language in this environment variable, all intentions and invocations will be in the selected language. Also when running `npm run docs`, this variable will generate new speechAssets in the selected language. 


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

## Remote deployment
Once I ensured the application works locally, I deployed on a Heroku server to have running in the background (could have used AWS, Google, etc). A few notes on deploying remotely:

 - You'll need to [open up a port](https://portforward.com/router.htm) on your router to map the address on your server and point to your local IP address on your TV. For example if you've set your environment variable `PORT=4001` you'll need to forward all requests from Port=4001 to port 3000 on the IP address of your LG TV on your local network.  
 - Heroku doesn't automatically deploy devdependencies from package.json so you'll need to set config var `YARN_PRODUCTION` to `false`. Don't forget to set all other variables like `TV_SOCKET` and `TV_MAC`, otherwise your application running remotely won't find your TV. 