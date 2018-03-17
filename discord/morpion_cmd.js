const Morpion = require("./morpion");
const Hash = require('hash.js')
var Morpion_cmd = {}
var index_morpion = {}

Morpion_cmd.manage = function(args,user)
{
    if(args.length < 1)
        return( '`~morpion start [username opponent]` to start a morpion vs someone or IA\n'
                +'`~morpion play <x> <y> [id game]`\n'
                +'`~morpion clean` to delete all your games\n'
                +'`~morpion games` to see your games')
    switch(args[0])
    {
        case 'start':
            return this.start(args,user)
        break;
        case 'play':
            return this.play(args,user)
        break;
        case 'clean':
            return this.delete(args,user)
        break;
        case 'games':
            return this.displayGames(args,user)
        break;
        default:
            return( '`~morpion start [username opponent]` to start a morpion vs someone or IA\n'
                   +'`~morpion play <x> <y> [id game]`\n'
                   +'`~morpion clean` to delete all your games\n'
                   +'`~morpion games` to see your games')

    }
}

//start a morpion game
Morpion_cmd.start = function(args,user)
{
    var players = []
    
    players[0] = user

    if(args[1])
    {
        players[1] = args[1]
    }
    else
    {
        players[1] = "IA"
    }

    m = Morpion.addGame(players[0],players[1])

    this.add(m,players)

    return  "\n"+players[0]+" VS "+players[1]+    
            "\n"+m.display()+
            "\n"+"`~morpion play x y` to play"
}

//add reference <morpion> for two players <players>
Morpion_cmd.add = function(morpion,players)
{
    if(players[0] in index_morpion)
        index_morpion[players[0]].push(m)
    else
        index_morpion[players[0]] = [m]

    if(players[1] in index_morpion)
        index_morpion[players[1]].push(m)
    else
        index_morpion[players[1]] = [m]
}

//delete all games from user <user>
Morpion_cmd.delete = function(args,user)
{
    //clean each games with this user
    index_morpion[user].forEach(element => {

        var players = element.getPlayer()
        Morpion.deleteGame(players[0],players[1])
        //clean reference for other player
        index_morpion[players[1]].forEach( (element_other,index_other) => {
            var players_other = element_other.getPlayer()
            if(players_other[0] == user || players_other[1] == user)
                delete index_morpion[players[1]][index_other] 
        })
    });

    //clean reference for this player
    index_morpion[user] = []
    
    return " All your games were deleted"
}


Morpion_cmd.play = function(args,user)
{
    let res = ""
    if( !( user in index_morpion && index_morpion[user].length > 0))
        return('`~morpion start` to start a morpion')
    else if(args[1] && args[2])
    {
        
        var morpion
        //if mutiple game but no id
        if(index_morpion[user].length > 1 && !args[3])
        {
            res += "Plusieurs parties en cours... + \n "
            res += this.displayGames([],user)
            return res;
        }

        //if id
        if(args[3])
        {
            if(index_morpion[user].length > args[3])
                morpion = index_morpion[user][args[3]]
            else
            {
                res += "id invalide... \n"
                res += this.displayGames([],user)
                return res;
            }
        }
        else
            morpion = index_morpion[user][0]

        if(!morpion)
            return('`~morpion start` to start a morpion')

        //try to play
        
        res = this.playSpecific(args[1],args[2],morpion,user)

        return res
    }
    else
       return 'type `~morpion play x y`'
}

Morpion_cmd.playSpecific = function(x,y,morpion,user)
{
    var morpion_res = morpion.play(x,y,user)
    let res = ""

    if(morpion_res[0] == "end")
    {
        return "\n" + morpion.display() + "\n" + morpion_res[1]
    }
    else if(morpion_res[0] == "error")
    {
        return morpion_res[1]
    }
    else
    {
        res += "\n" + morpion_res[1]
        res +="\n" + morpion.display()

        if(morpion.getPlayer()[1] == "IA" && user != "IA")
            res += this.playSpecific(0,0,morpion,"IA")

        return  res;
    }
}


Morpion_cmd.displayGames = function(args,user)
{   
    var res = ""
    if(index_morpion[user])
        index_morpion[user].forEach((element,index) => {

            var players = element.getPlayer()
            res += index+" : "+players[0] + " VS " + players[1]+"\n"
        
        })
    else
        res = "no games"
    return res;

}



module.exports = Morpion_cmd;