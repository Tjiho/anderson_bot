const Cmds = require("./cmd")
const config = require("./static values/config")
const TeleBot = require('telebot');
const bot = new TeleBot(config.botKey);

bot.on('text', (msg) => 
{
	var message = msg.text
	console.log(message)
	var ok = false
    	if (message.substring(0, 1) == '~') 
    	{
        	message = message.slice(1)
		for(cmd_name in Cmds)
		{
			if(Cmds[cmd_name].test(message))
			{
			    Cmds[cmd_name].action(message,msg.reply.text,msg.reply.text)
			    return true
			}    
		}

		Cmds["default"].action(message,msg.reply.text,msg.reply.text)
	}	
	
})

bot.start();    	
