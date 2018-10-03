const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send,client)
{
    f_send("https://cdn.discordapp.com/attachments/384061924054138904/491221761333919745/3031818724_1_10_Y0f2mA9i.gif")
}

exports["test"] = (message) => (message.indexOf("ennui") > -1) || (message.indexOf("blbl") > -1) 


exports["help"] = 
{
    cmd:["... ennui ... | ... blbl ..."],
    help:"gif ennui"
}
