const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send)
{
    f_send("http://www.randomnoun.com/wpf/shell32-avi/tshell32_162.gif")
    
    var args = message.split(' ');
    cmd = args[0]
    args = args.splice(1);

    if(args.length > 0)
    {
        if(cmd[cmd.length -1] == "e")
            f_send(args.join(" ")+" was "+cmd+"d");
        else
            f_send(args.join(" ")+" was "+cmd+"ed");
    }
}

exports["test"] = (message) => Check.checkCmd(message,["delete"])


exports["help"] = 
{
    cmd:["delete <something>"],
    help:"delete it"
}
