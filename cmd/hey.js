const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send)
{
    f_reply("hey")
}

exports["test"] = (message) => {
    return  Check.checkCmd(message,["hey"]) || 
            Check.checkCmd(message,["bonjour"]) ||
            Check.checkCmd(message,["hej"]) ||
            Check.checkCmd(message,["hi"]) ||
            Check.checkCmd(message,["hello"])

}


exports["help"] = 
{
    cmd:["hey | bonjour | hi | hello | hej"],
    help:"anderson vous dit bonjour"
}