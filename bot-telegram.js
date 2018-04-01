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
        var message = req.body.message.text
        var ok = false
        var channel = req.body.message.chat.id
        if (message.substring(0, 1) == '~') 
        {
            message = message.slice(1)
            for(cmd_name in Cmds)
            {
                if(Cmds[cmd_name].test(message))
                {
                    Cmds[cmd_name].action(message,(msg) => send(msg,channel),(msg) => send(msg,channel))
                    return true
                }    
            }

            Cmds["default"].action(message,(msg) => reply(e,msg),(msg) => send(e,msg))
        }
    	
    		//derson.getMsg(req.body.message.text, req.body.message.from.first_name, req.body.message.from.last_name, req.body.message.chat.id)
})


Server.get('/', (req, res) =>
{
        res.send('Hello World!')
})

Server.listen(Config.port, () => 
{
    console.log('Anderson server is listening on port '+Config.port)
})

function send(message,channel)
{
	Request.post(
		{
			'uri':'https://api.telegram.org/'+Config.botKey+'/sendMessage', 
			form:{"chat_id":channel,"text":message},
			'encoding':'utf-8',
			headers: {
    				"Content-Type":"application/json; charset=utf-8"
  			}
		},
		function (error, response, body) 
		{
  			console.log(error)
		}
	)
}