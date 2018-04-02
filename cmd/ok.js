const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send)
{
    f_send("!ok")
}

exports["test"] = (message) => Check.checkCmd(message,["ok"])


exports["help"] = 
{
    cmd:["ok"],
    help:"send ok img"
}
