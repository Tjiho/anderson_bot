//const Morpion = require("./morpion");
const Hash = require('hash.js')
const Cloner = require('cloner')

var Morpion_cmd = function(game,name,real_name)
{
    this.index_morpion = {}
    this.list_morpions = {}
    this.game = game
    this.name = name
    this.real_name = real_name
    this.players = []


    this.manage = function(args,user)
    {
        if(args.length < 1)
            return( 'Type `~'+this.name+' start [username opponent]` to start a '+this.real_name+' vs someone or IA\n'
                    + this.game.helpPlay() + '\n'
                    +'Type `~'+this.name+' clean` to delete all your games\n'
                    +'Type `~'+this.name+' games` to see your games')
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
                return( 'Type `~'+this.name+' start [username opponent]` to start a '+this.real_name+' vs someone or IA\n'
                    + this.game.helpPlay() + '\n'
                    + 'Type `~'+this.name+' clean` to delete all your games\n'
                    + 'Type `~'+this.name+' games` to see your games')

        }
    }

    //start a morpion game
    this.start = function(args,user)
    {
        this.players = []
        var res = ""
        this.players[0] = user

        if(args[1])
        {
            this.players[1] = args[1]
        }
        else
        {
            this.players[1] = "IA"
        }

        var hash = Hash.sha256().update(this.players[0]+"-"+this.players[1]).digest('hex');
        m = new this.game(this.players[0],this.players[1])

        if(!(hash in this.list_morpions))
            this.addIndex(m,this.players)
        else
            res += "\n Old games erased \n"

        this.list_morpions[hash] = m;
        
        return  res+
                "\n"+this.players[0]+" VS "+this.players[1]+    
                "\n"+m.display()+
                "\n"+this.game.helpPlay()
    }

    //add reference <morpion> for two players <players>
    this.addIndex = function(morpion,players)
    {
        if(players[0] in this.index_morpion)
            this.index_morpion[players[0]].push(m)
        else
            this.index_morpion[players[0]] = [m]

        if(players[1] in this.index_morpion)
            this.index_morpion[players[1]].push(m)
        else
            this.index_morpion[players[1]] = [m]
    }

//delete all games from user <user>
    this.delete = function(args,user)
    {
        //clean each games with this user
        this.index_morpion[user].forEach(element => {

            var players = element.getPlayer()
            var hash = Hash.sha256().update(players[0]+"-"+players[1]).digest('hex');
            if(hash in this.list_morpions)
                delete this.list_morpions[hash]
            //clean reference for other player
            this.index_morpion[players[1]].forEach( (element_other,index_other) => {
                var players_other = element_other.getPlayer()
                if(players_other[0] == user || players_other[1] == user)
                    delete this.index_morpion[players[1]][index_other] 
            })
        });

        //clean reference for this player
        this.index_morpion[user] = []
        
        return " All your games were deleted"
    }


    this.play = function(args,user)
    {
        let res = ""
        args = args.splice(1)
        if( !( user in this.index_morpion && this.index_morpion[user].length > 0))
            return('`~'+this.name+' start` to start a '+this.real_name)
        else if(args.length < this.game.nbrArgs())
        {
            return '`~'+this.name+' play` needs two arguments'
        }
        else 
        {
            
            var morpion
            //if mutiple game but no id
            if(this.index_morpion[user].length > 1 && !args[this.game.nbrArgs()])
            {
                res += "Plusieurs parties en cours... + \n "
                res += this.displayGames([],user)
                return res;
            }

            //if id
            if(args[this.game.nbrArgs() + 1])
            {
                if(this.index_morpion[user].length > args[this.game.nbrArgs()])
                    morpion = this.index_morpion[user][args[this.game.nbrArgs()]]
                else
                {
                    res += "id invalide... \n"
                    res += this.displayGames([],user)
                    return res;
                }
            }
            else
                morpion = this.index_morpion[user][0]

            if(!morpion)
                return('`~'+this.name+' start` to start a '+this.real_name)

            //try to play
            
            res = this.playSpecific(args,morpion,user)

            return res
        }
        
    }

    this.playSpecific = function(args,morpion,user)
    {
        var morpion_res = morpion.play(user,args)
        let res = ""

        if(morpion_res[0] == "win" || morpion_res[0] == "end")
        {
            return "\n"+morpion_res[1]+"\n" + morpion.display()
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
               res+=this.playIA(morpion)
            return  res;
        }
    }


    this.cerveauIa = function(morpion,iteration,coup,player_id)
    {
        var score = 0;
        var coups = this.game.coupsPossibles()
        if(iteration > 4)
        {
            return 0
        }
        var morpion_res = morpion.play(this.players[player_id],coup)
        //console.log(morpion_res," ",iteration)
        if(morpion_res[0] == "error" && iteration == 0)
        {
            return 9999
        }
        else if(morpion_res[0] == "end" || morpion_res[0] == "error")
        {
            return 0
        }
        else if(morpion_res[0] == "win" && player_id == 1)//me (IA) win
        {
            return 1
        }
        else if(morpion_res[0] == "win" && player_id == 0)//other win
        {
            return 10
        }

        coups.forEach(coup_test => {
            score += this.cerveauIa(Cloner.deep.copy(morpion),iteration+1,coup_test,(player_id + 1)%2)
        });

        return score;
        
    }

    this.playIA = function(morpion)
    {
        var bestScore = 9999;
        var score;
        var coups = this.game.coupsPossibles()
        var final;
        coups.forEach(coup_test => {
            score = this.cerveauIa(Cloner.deep.copy(morpion),0,coup_test,1)
            console.log(coup_test)
            console.log(score+" - "+bestScore)
            if(score < bestScore)
            {
                bestScore = score
                final = coup_test
            }
        });
        console.log('F:')
        console.log(final)
        return this.playSpecific(final,morpion,"IA")
    }

    this.displayGames = function(args,user)
    {   
        var res = ""
        if(this.index_morpion[user])
            this.index_morpion[user].forEach((element,index) => {

                var players = element.getPlayer()
                res += index+" : "+players[0] + " VS " + players[1]+"\n"
            
            })
        else
            res = "no games"
        return res;

    }

}


function clone(item) {
    if (!item) { return item; } // null, undefined values check

    var types = [ Number, String, Boolean ], 
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function(type) {
        if (item instanceof type) {
            result = type( item );
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call( item ) === "[object Array]") {
            result = [];
            item.forEach(function(child, index, array) { 
                result[index] = clone( child );
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                var result = item.cloneNode( true );    
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = clone( item[i] );
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
}

module.exports = Morpion_cmd;
