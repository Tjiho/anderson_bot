exports["action"] = function(message,f_reply,f_send,client)
{

    var args = message.split(' ');
    cmd = args[0]
    args = args.splice(1);

    if(args.length > 0)
    {
        if(cmd[cmd.length -1] == "e")
        {
		result = args.join(" ")+" was "+cmd+"d"
		result = result.replace("<@424318724242407424>","I")
		f_send(result)
	}
        else
            f_send((args.join(" ")+" was "+cmd+"ed").replace("<@424318724242407424>","I"));
    }
    else
        f_reply("type `~help` or `~aide` or `~?`")
}

exports["test"] = (message) => false


exports["help"] = 
{
    cmd:["<verb> [words]"],
    help:"anderson conjugue le verbe en anglais"
}
