const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send,client)
{
    
    var args = message.split(' ');
    cmd = args[0]
    args = args.splice(1);

    if(args.length > 0)
    {
        f_send(args.join(" "));
    }
    else
        f_send("anderson ne dit rien")
}

exports["test"] = (message) => Check.checkCmd(message,["say"]) || Check.checkCmd(message,["echo"]) || Check.checkCmd(message,["dit"]) || Check.checkCmd(message,["dis"]) 

exports["help"] = 
{
    cmd:["echo || say"],
    help:"anderson parle"
}
