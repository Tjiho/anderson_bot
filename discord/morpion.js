const Hash = require('hash.js')

class Morpion
{

    constructor(player1,player2)
    {
        this.player1 = player1
        this.player2 = player2
        this.tour = false
        this.nombreTour = 0

        this.grilleContenu = 
        [
            [false,false,false],
            [false,false,false],
            [false,false,false]
        ];

        this.grilleJoueur = 
        [
            [-1,-1,-1],
            [-1,-1,-1],
            [-1,-1,-1]
        ];

        
    }

    getPlayer()
    {
        return [this.player1,this.player2];
    }
    display()
    {
        var res = ""
        for(let x = 0;x<3;x++)
        {
            res+="`|"
            for(let y = 0;y<3;y++)
            {
                if(this.grilleContenu[x][y])
                    if(this.grilleJoueur[x][y])
                        res+="x"
                    else
                        res+="o"
                else
                    res+=" "
                
                res+="|"
            }
            res += '`\n'
        }
        return res
    }


    play(user,args)
    {
            var x = args[0]
            var y = args[1]
            if(this.tour && user != this.player2)
            {
                return ["error","It's not your turn"]
            }

            if((!this.tour) && user != this.player1)
            {
                return ["error","It's not your turn"]
            }                

            let res;
            

            if(user != "IA")
            {
                x=x-1;
                y=y-1;
                if(! this.grilleContenu [x][y] )
                {
                    this.nombreTour++
                    this.tour = !this.tour
                    this.grilleContenu [x][y] = true;
                    this.grilleJoueur [x][y] = this.tour;
                }
                else
                    return ["error","Invalid"]
            }
            else
            {
                this.nombreTour++
                this.tour = !this.tour
                var c = this.playIa()
                x = c[0]
                y = c[1]
            }

            if(this.nombreTour > 8 )
            {
                return ["end","egualité !"]
            }

            if(this.gainCol(y,this.tour,this.grilleJoueur) || this.gainligne(x,this.tour,this.grilleJoueur) || this.gainDiag(this.tour,this.grilleJoueur) )
                return ["end",user + " win !"]

            return ["ok",user+" played"]
    }

    gainCol(y,tour,grille)
    {
            return (grille[0][y] == tour) && (grille[1][y] == tour) && (grille[2][y] == tour);
    }
    gainligne(x,tour,grille)
    {
            return (grille[x][1] == tour) && (grille[x][2] == tour) && (grille[x][0] == tour);
    }
    gainDiag(tour,grille)
    {
            return ((grille[0][0] == tour) && (grille[1][1] == tour) && (grille[2][2] == tour)) || ((grille[0][2] == tour) && (grille[1][1] == tour) && (grille[2][0] == tour))
    }

    alea()
    {
            return Math.floor(Math.random() * 3);
    }


    playIa()
    {  
        var x;
        var y;
            if(this.nombreTour < 9)
            {
                    do
                    {
                            
                        x=this.alea();
                        y=this.alea();
                    }
                    while(this.grilleContenu[x][y])

                    this.grilleContenu [x][y] = true;
                    this.grilleJoueur [x][y] = this.tour;
            }
        return [x,y]
    }

    static nbrArgs()
    {
        return 2
    }
    



}


module.exports = Morpion;