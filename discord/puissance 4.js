const Hash = require('hash.js')

class Pui4
{

    constructor(player1,player2)
    {
        this.color = ["yellow", "red"];

        this.color_win = "green";
        this.player = 0;
        this.cols = 7;
        this.lines = 6;
        this.linesGraph = 7;

        this.grille = new Array(this.cols * this.lines);
        this.reinitialiserGrille(this.grille);

        /* Graph variables */
        /*
        var d_width;
        var d_height;
        var d_size_case;
        */
        this.players = [player1,player2]
        this.player1 = player1
        this.player2 = player2
        
    }

    static helpPlay()
    {
        return "Type `~p4 play <col>` to play"
    }

    getPlayer()
    {
        return [this.player1,this.player2];
    }
    display()
    {

        var i;
        var j;
        var res = ""

        
        res+="`."
        for(j = 0; j < 7; j++) 
        {
            res+=(j+1)+" "
        }
        res += '`\n'
        

        for(i = 0; i < 6; i++) 
        {
            res+="`|"
            for(j = 0; j < 7; j++) 
            {
                if(this.grille[j + this.cols*i] === undefined)
                    res+=" "
                else
                    if(this.grille[j + this.cols*i])
                        res+="x"
                    else
                        res+="o"
                
                res+="|"
            }
            res += '`\n'
        }
        return res
    }

    

    addJeton(colonne) {
        var place = false;
        var i = 5;
        while(i >= 0 && place != true) {
            if(this.grille[colonne + this.cols*i] === undefined) {
                this.grille[colonne + this.cols*i] = this.player;
                place = true;
            }

            i--;
        }

        return place;
    }

    changePlayer() {
        this.player = (this.player + 1)%2;
    }

    play(user,args) {
        var place = false;
        place = this.addJeton(args[0]-1)

        if(this.players[this.player] != user)
            return ["error","It's not your turn"]

        if(place == true) {
            var win = this.verificationPartie();
            if(win == 1)
                return ["win",user + " win !"]
            
            if(win == 2)
                return ["end","egualité !"]
            
            this.changePlayer();
            return ["ok",user+" played"]
        }
        else
        {
            return ["error","Invalid"]
        }


    }


    verificationPartie() {
        if(this.verificationGagnant(this.player,this.grille)) {
            this.display()
            this.reinitialiserGrille();
            return 1
        }
        else if(this.verificationEgalite(this.grille,this.grille)) {
            this.reinitialiserGrille();
            this.display()
            return 2
        }
        else
            return 0;

    }

    reinitialiserGrille() {
        var i;
        var j;
        for(i = 0; i < 6; i++) {
            for(j = 0; j < 7; j++) {
                this.grille[j + this.cols*i] = undefined;
            }
        }
    }

    verificationEgalite(grille) {
        var egalite = true;
        var i = 0;
        var j = 0;
        while(i < 6 && egalite == true) {
            while(j < 7 && egalite == true) {
                if(grille[j + this.cols*i] === undefined) {
                    egalite = false;
                }
                j++;
            }
            i++;
        }
        return egalite;
    }

    verificationGagnant(joueur,grille) {
        var i;
        var j;
        for(i=0;i<3;i++)
        {
            for(j=0;j<7;j++)
            {
                if(grille[j + this.cols*i]==joueur && grille[j + this.cols*(i+1)]==joueur && grille[j + this.cols*(i+2)]==joueur && grille[j + this.cols*(i+3)]==joueur) {
                    return true;
                }
            }
        }

        for(i=0;i<6;i++)
        {
            for(j=0;j<4;j++)
            {
                if(grille[j + this.cols*i]==joueur && grille[(j+1) + this.cols*i]==joueur && grille[(j+2) + this.cols*i]==joueur && grille[(j+3) + this.cols*i]==joueur) {
                    return true;
                }
            }
        }


        for(i=0;i<3;i++)
        {
            for(j=0;j<4;j++)
            {
                if(grille[j + this.cols*i]==joueur && grille[(j+1) + this.cols*(i+1)]==joueur && grille[(j+2) + this.cols*(i+2)]==joueur && grille[(j+3) + this.cols*(i+3)]==joueur) {
                    return true;
                }
            }
        }


        for(j=0;j<4;j++)
        {
            for(i=5;i>=3;i--)
            {
                if(grille[j + this.cols*i]==joueur && grille[(j+1) + this.cols*(i-1)]==joueur && grille[(j+2) + this.cols*(i-2)]==joueur && grille[(j+3) + this.cols*(i-3)]==joueur){
                    return true;
                }
            }
        }
        return false;
    }

    cerveau(x,playerFictif,tourIa,grilleFictif)
    {
            var gain = 0;
            var i;
            var j;

            grilleFictif [x][y] = tourFictif;

            //console.log(nombreFictif,':',x,' ',y);
            if(nombreFictif > this.nombreTour+3)
            {
                    grilleContenuFictif [x][y] = false;
                    grilleJoueurFictif [x][y] = -1;
                    return 0;
            }
            else if(this.gainCol(y,tourFictif,grilleJoueurFictif) || this.gainligne(x,tourFictif,grilleJoueurFictif) || this.gainDiag(tourFictif,grilleJoueurFictif) && (tourFictif == tourIa))
            {
                    grilleContenuFictif [x][y] = false;
                    grilleJoueurFictif [x][y] = +1;
                    return 1;
            }
            else if(this.gainCol(y,tourFictif,grilleJoueurFictif) || this.gainligne(x,tourFictif,grilleJoueurFictif) || this.gainDiag(tourFictif,grilleJoueurFictif) && (tourFictif != tourIa))
            {
                    grilleContenuFictif [x][y] = false;
                    grilleJoueurFictif [x][y] = -1;
                    return +5;
            }
            else
            {

                    for(i=0;i<3;i++)
                    {
                            for(j=0;j<3;j++)
                            {
                                            //console.log('x,y:'+x+' '+y);
                                            if(!grilleContenuFictif[i][j])
                                            {
                                                    gain = gain + this.cerveau(i,j,!tourFictif,nombreFictif+1,tourIa,grilleJoueurFictif,grilleContenuFictif);

                                                    //console.log('gain: '+gain + 'x,y:'+x+' '+y);
                                            }

                            }
                    }
                    grilleContenuFictif [x][y] = false;
                    grilleJoueurFictif [x][y] = -1;
                    return gain

            }

            grilleContenuFictif [x][y] = false;
            grilleJoueurFictif [x][y] = -1;
            return 0;
    }


    


    playIa()
    {  
        console.log("ia...")
        if(this.nombreTour < 9)
        {
            var x=1;
            var y=1;
            var end;
            var bon = 999;
            var temp;

            do
            {
                    for(let i=0;i<3;i++)
                    {
                            for(let j=0;j<3;j++)
                            {
                                    if(!this.grilleContenu[i][j])
                                    {
                                            temp = this.cerveau(i,j,this.tour,this.nombreTour,this.tour,this.grilleJoueur,this.grilleContenu);
                                            console.log("--->"+i+"_"+j+"_"+temp);
                                            if(temp < bon)
                                            {
                                                    bon = temp;
                                                    x=i;
                                                    y=j;
                                            }


                                    }

                            }
                    }
                    //x=alea();
                    //y=alea();
            }while(this.grilleContenu[x][y])
        }
        return [x,y]
    }


    static nbrArgs()
    {
        return 1
    }

    static coupsPossibles()
    {
        var c = []
        for(let i=0;i<7;i++)
            c.push([i+1])

        return c
    }
    



}


module.exports = Pui4;
