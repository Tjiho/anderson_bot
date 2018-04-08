var Discordie = require("discordie");
var Events = Discordie.Events;
var client = new Discordie();
const config = require("./static values/config")
const Cmds = require("./cmd")
const Cmds_embed = require("./cmd_discord")



client.connect({ token: config.discord });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    
    var message = e.message.content
    var ok = false
    var arobase = false
  
    if (message.substring(0, 1) == '~' || message.indexOf("<@424318724242407424>") > -1) 
    {
        if (message.substring(0, 1) == '~') 
		message = message.slice(1)
        

        if (message.substring(0, 3) == '<@4')
        {
		    message = message.slice(22) 
            arobase = true
        }
        
        if(e.message.author.username == "Krysthalia")
        {
            Cmds["random"].action(message,(msg) => reply(e,msg),(msg) => send(e,msg))
            setTimeout(() => execCmd(   
                                message,
                                (msg) => reply(e,msg),
                                (msg) => send(e,msg),
                                arobase,
                                true
                            ), 1500);  
        }
        else
            execCmd(
                message,
                (msg) => reply(e,msg),
                (msg) => send(e,msg),
                arobase,
                false
            )

        
    }
});

function execCmd(message,f_reply,f_send,arobase,special)
{
    console.log("plop")
    try
    {
        for(cmd_name in Cmds)
        {
            if(Cmds[cmd_name].test(message))
            {
                Cmds[cmd_name].action(message,f_reply,f_send)
                return true
            }    
        }
    
        for(cmd_name in Cmds_embed)
        {
            if(Cmds_embed[cmd_name].test(message))
            {
                Cmds_embed[cmd_name].action(message,f_reply,f_send)
                return true
            }    
        }
    
        if(! arobase)
            Cmds["default"].action(message,f_reply,f_send)
        else
            Cmds["random"].action(message,f_reply,f_send)
    }
    catch(err)
    {
        console.log(err)
        e.message.channel.sendMessage("un électron quantique a tout cassé : "+err)     
    }
    
}

function reply(e,message)
{
    e.message.reply(message)
}

function send(e,message)
{
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
