var Discordie = require("discordie");
var Events = Discordie.Events;
var client = new Discordie();
const Cmds = require("./cmd")
const Cmds_embed = require("./cmd_discord")


client.connect({ token: "NDI0MzE4NzI0MjQyNDA3NDI0.DZW95A.abG-xg4NjAxaoqWNPgZZPcAkCiA" });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    
    var message = e.message.content
    var ok = false
    if (message.substring(0, 1) == '~') 
    {
        message = message.slice(1)
        try
        {
            for(cmd_name in Cmds)
            {
                if(Cmds[cmd_name].test(message))
                {
                    Cmds[cmd_name].action(message,(msg) => reply(e,msg),(msg) => send(e,msg))
                    return true
                }    
            }

            for(cmd_name in Cmds_embed)
            {
                if(Cmds_embed[cmd_name].test(message))
                {
                    Cmds_embed[cmd_name].action(message,(args) => embed(e,args))
                    return true
                }    
            }

            Cmds["default"].action(message,(msg) => reply(e,msg),(msg) => send(e,msg))
        }
        catch(err)
        {
            console.log(err)
            e.message.channel.sendMessage("un électron quantique a tout cassé : "+err)     
        }
     }
});

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