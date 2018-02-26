# Anderson Bot

Futur telegram bot which will answer to basic french questions thanks to wikidata.org.

There is also a proxy object to communicate with wikidata.org 

## install bot

```
npm install
```

` There is less than 50 dependancies !! xD `

and edit config.js

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
 - anderson.js : manage the bot
 - wikidata.js : proxy to do request to wikidata
 - log.js : interface to log error and msg
 - config.js : the config file