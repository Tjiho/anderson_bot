const Check = require("../share/check")

const Cmds = require("../cmd")
const Cmds_embed = require("./index")

exports["action"] = function(message,f_send)
{

    list_cmds = []
    for(cmd_name in Cmds)
    {
        let help_cmd = Cmds[cmd_name]["help"]
        let help = {}
        help["name"] = help_cmd["cmd"].join(",")
        help["value"] = help_cmd["help"]
        list_cmds.push(help)
    }
        
    console.log(list_cmds)
    f_send({
        color: 0x36e24e,
        author: {name: "Tom Darboux"},
        title: "Anderson sonne sonne ",
        fields: list_cmds
    })
}

exports["test"] = (message) => Check.checkCmd(message,["help"])


exports["help"] = 
{
    cmd:["help"],
    help:"affiche l'aide"
}