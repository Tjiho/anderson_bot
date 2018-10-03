var Discordie = require("discordie");
var Events = Discordie.Events;
var client = new Discordie();
const config = require("./static values/config")
const Cmds = require("./cmd")
const Cmds_embed = require("./cmd_discord")
const Spam = require("./spam")



client.connect({ token: config.discord });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);

client.User.setGame({type: 0, name: "Tourner en boucle"});


});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    
    var message = e.message.content
    var ok = false
    var arobase = false

	execSpam(
		message,
		(msg) => reply(e,msg),
		(msg) => send(e,msg),
		(msg) => embed(e,msg),
		false,
		false
	)
    if (message.substring(0, 1) == '~' || message.indexOf("<@424318724242407424>") > -1 || message.indexOf("@anderson") > -1) 
    {
        if (message.substring(0, 1) == '~') 
		message = message.slice(1)
        

        if (message.substring(0, 3) == '<@4')
        {
		    message = message.slice(22) 
            arobase = true
        }
        
        if(e.message.author.username == "dKrysthalia")
        {
            Cmds["random"].action(message,(msg) => reply(e,msg),(msg) => send(e,msg))
            setTimeout(() => execCmd(   
                                message,
                                (msg) => reply(e,msg),
                                (msg) => send(e,msg),
                                (msg) => embed(e,msg),
                                arobase,
                                true
                            ), 1500);  
        }
        else
	{
		if(message.indexOf("figlet ") == 0)
		{
			message = message.slice(7)
			console.log(message)	
			execCmd(
				message,
				(msg) => reply(e,"!figlet " + msg),
				(msg) => send(e,"!figlet " + msg),
				(msg) => embed(e,"!figlet " + msg),
				arobase,
				false
			)
		}
		else
		    execCmd(
			message,
			(msg) => reply(e,msg),
			(msg) => send(e,msg),
			(msg) => embed(e,msg),
			arobase,
			false
		    )
	}
        
    }
});



function execSpam(message,f_reply,f_send,f_embed,arobase,special)
{

    try
    {
        for(cmd_name in Spam)
        {
            if(Spam[cmd_name].test(message))
            {
                Spam[cmd_name].action(message,f_reply,f_send,client)
                return true
            }    
	}
    }
    catch(err)
    {
        console.log(err)
        f_send("un électron quantique a tout cassé : "+err)     
    }    
}

function execCmd(message,f_reply,f_send,f_embed,arobase,special)
{
    try
    {
        for(cmd_name in Cmds)
        {
            if(Cmds[cmd_name].test(message))
            {
                Cmds[cmd_name].action(message,f_reply,f_send,client)
                return true
            }    
        }
    
        for(cmd_name in Cmds_embed)
        {
            if(Cmds_embed[cmd_name].test(message))
            {
                Cmds_embed[cmd_name].action(message,f_embed)
                return true
            }    
        }
    
        if(! arobase)
            Cmds["default"].action(message,f_reply,f_send)
        else
            Cmds["random"].action(message,f_reply,f_send)
/*
	const co = require('./cogite.js');
console.log("toto");
	if(message.toString()[1]!='>'){
		//message = message.replace(","," ");
		f_send("-"+co.cherchePattern(message));
	}*/
    }
    catch(err)
    {
        console.log(err)
        f_send("un électron quantique a tout cassé : "+err)     
    }
    
}

function reply(e,message)
{
    message = message.replace("<me>",e.message.author.nickMention)
    e.message.reply(message)
}

function send(e,message)
{
    message = message.replace("<me>",e.message.author.nickMention)
    e.message.channel.sendMessage(message)
}

function help(e,list_cmd)
{
    e.message.reply("plop")
}

function embed(e,args)
{
   e.message.channel.sendMessage("message with an embed", false,args)
}
