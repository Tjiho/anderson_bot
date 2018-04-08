exports["action"] = function(message,f_reply,f_send)
{

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
    else
        f_reply("type `~help`")
}

exports["test"] = (message) => false


exports["help"] = 
{
    cmd:["<verb> [words]"],
    help:"anderson conjugue le verbe en anglais"
}