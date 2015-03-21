PROJECT NAME
=========

_A simple application for looking up members by skill type and/or job role. _

## Installation
Clone down the repo to local and follow the install steps below.

## Getting started

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Setup:
    * _We use Parse.com for our backend so you will need to create a new application and install keys_
    * Create a file at `app/lib/parseInit.js` and add the following code with your Parse.com application keys:
    ```js
    Parse.initialize("uTAI2TS4OQWE6Ab90co1oyXO4kbRTvfhfgXLMf1U", "h9z9rmRrmlA47mE66lY33xvGk0f3ooPLrNKEozp5");

    module.exports = Parse;
    ```
* Run:
    * `brunch watch -s` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Backbone site](http://backbonejs.org/)


## Contributing
Please consider the github issues and the wiki page for ideas, before submitting pull requests with patches and new features. If your going to submit code please also see the [coding style guide](https://github.com/airbnb/javascript)

There are many ways you can contribute to the project:

- Fix a bug or implement a new feature.
- Write an extension and tell us about it!
- Test and report bugs you find.
- Write unit tests.
- Translate Project into other languages (and help keep those translations up to date).
- Write documentation and help keep it up to date (please see wiki for examples).

## Testing
running `grunt test` will run the unit tests.

## Project Team
* Chad Drummond ([@chadwithuhc](https://github.com/chadwithuhc))
* Trenton Kennedy ([@trentontri](https://github.com/trentontri))
