const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send)
{
    f_send("https://cdn.discordapp.com/attachments/384061924054138904/430409811142901760/2018-04-02-185434_259x31_scrot.png")
}

exports["test"] = (message) => Check.checkCmd(message,["about"]) 


exports["help"] = 
{
    cmd:["about"],
    help:"it does not actually exist"
}
