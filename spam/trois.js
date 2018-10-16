const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send,client)
{
        f_send("Soleil :sun_with_face: !")
}

exports["test"] = (message) => {
    return  Check.checkCmd(message,["trois"]) || 
            Check.checkCmd(message,["3"]) ||
            Check.checkCmd(message,["troi"])
}


exports["help"] = 
{
    cmd:["trois"],
    help:"soleil"
}
