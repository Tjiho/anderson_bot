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

exports["test"] = (message) => Check.checkCmd(message,["echo"])


exports["help"] = 
{
    cmd:["echo"],
    help:"anderson parle"
}
