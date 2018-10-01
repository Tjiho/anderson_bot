const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send,client)
{
    f_send("https://tetris.weloveminitel.eu/upload/Screenshot_20181001_115509.png")
}

exports["test"] = (message) => Check.checkCmd(message,["ok"])


exports["help"] = 
{
    cmd:["ok"],
    help:"send ok img"
}
