const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send,client)
{
    f_send("https://gph.is/2ry1MNK")
}

exports["test"] = (message) => Check.checkCmd(message,["ha"]) ||  Check.checkCmd(message,["ah"]) 


exports["help"] = 
{
    cmd:["ha | ah"],
    help:"gif ha"
}
