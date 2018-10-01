const Check = require("../share/check")

exports["action"] = function(message,f_reply,f_send,client)
{
    forsomeone = message.indexOf("@")
    me = message.indexOf("@424318724242407424>")
    //console.log(forsomeone,me)
    if(forsomeone < 0 || forsomeone == me)
        f_reply("hey")
    else
    {
        who = message.substring(forsomeone+1, 21)//get id of user
        user = client.Users.find(u => u.id.indexOf(who) > -1)//get user by id
        f_send(user.nickMention+" bonjour de la part de <me>")
    }
}

exports["test"] = (message) => {
    return  Check.checkCmd(message,["hey"]) || 
            Check.checkCmd(message,["bonjour"]) ||
            Check.checkCmd(message,["hej"]) ||
            Check.checkCmd(message,["hi"]) ||
            Check.checkCmd(message,["hey"]) ||
	    Check.checkCmd(message,["salut"]) ||
	    Check.checkCmd(message,["coucou"]) ||
            Check.checkCmd(message,["hello"])

}


exports["help"] = 
{
    cmd:["hey | salut | bonjour | hi | hello | hej"],
    help:"anderson vous dit bonjour"
}
