const Check = require("../share/check")
const fs = require("fs")

exports["action"] = function(message,f_reply,f_send,client)
{
    fs.readFile("random.txt", function(err, data){
        if(err) throw err;
        data+=""
        var lines = data.split('\n');
        
        f_send( lines[Math.floor(Math.random()*lines.length)]);
    })
}

exports["test"] = (message) => Check.checkCmd(message,["random"])


exports["help"] = 
{
    cmd:["random"],
    help:"anderson say somthing random"
}