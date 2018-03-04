const Express = require('express')
const Server = Express()
const Config = require('./static values/config')
const BodyParser = require('body-parser')
const Anderson = require('./src/anderson')
const Log = require('./src/log')

Server.use(BodyParser.json()); // for parsing application/json
Server.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

Server.post('/update/'+Config.key,(req, res) =>
{
    	Log.log("request args:",req.body)
    	try {
    		Anderson.getMsg(req.body.message.text, req.body.message.from.first_name, req.body.message.from.last_name, req.body.message.chat.id)
	}
	catch(err)
	{
		Log.error(err);
	}
	res.send("ok")
})


Server.get('/', (req, res) =>
{
        res.send('Hello World!')
})

Server.listen(Config.port, () => 
{
    console.log('Anderson server is listening on port '+Config.port)
})
