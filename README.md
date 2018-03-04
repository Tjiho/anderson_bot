# Anderson Bot

Futur telegram bot which will answer to basic french questions thanks to wikidata.org.

There is also a proxy object to communicate with wikidata.org 

## install bot

```
npm install
```

and create '`static values/config.js`' with:

```javascript
var config = {};

config.key = "a random key"
config.botKey = "botkey"
config.error = "file for error"
config.log = "file for log info"
config.port = "3456"
module.exports = config;
```

## launch test

```
npm run test
```

### launch bot

```
node bot.js
```

### project architecture

 - bot.js : main program, this is the server
 - src/anderson.js : manage the bot
 - src/wikidata.js : proxy to do request to wikidata
 - src/log.js : interface to log error and msg
 - static values/config.js : config file
 - static values/data.js : globals vars not private