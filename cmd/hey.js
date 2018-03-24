const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send)
{
    f_reply("hey")
}

exports["test"] = (message) => Check.checkCmd(message,["hey"])


exports["help"] = 
{
    cmd:["hey"],
    help:"anderson vous dit bonjour"
}