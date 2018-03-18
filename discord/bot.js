var Discordie = require("discordie");
var Events = Discordie.Events;
var client = new Discordie();

const Morpion = require("./morpion");
const Morpion_cmd = require("./morpion_cmd");

morpion_cmd = new Morpion_cmd(Morpion,"morpion","tic tac toe")

client.connect({ token: "NDI0MzE4NzI0MjQyNDA3NDI0.DZBNhA.RXcigkKtOScuqHjLHKZetONfQOE" });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    
    var message = e.message.content
    


    if (message.substring(0, 1) == '~') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        try
        {
        args = args.splice(1);
        switch(cmd) {
            // !start
            case 'help':
                e.message.channel.sendMessage("message with an embed", false,{
                    color: 0x36e24e,
                    author: {name: "Tom Darboux"},
                    title: "Anderson sonne sonne ",
                    fields: 
                    [
                        {name: "Basic", value: "`hey`,`help`"},
                        {name: "Morpion", value: "`morpion start [user]`,`morpion play <x> <y> [id]`,`morpion clean`,`morpion games`"}
                    ],
                })
            break;
            case 'hey':(
                e.message.reply("hey !"))
            break;
            case 'morpion':
                //e.message.channel.sendMessage("la sation spatiale n'est pas encore operationelle")
                e.message.channel.sendMessage(morpion_cmd.manage(args,e.message.author.username))                
            break;
            case 'game':
                //e.message.channel.sendMessage("la sation spatiale n'est pas encore operationelle")
                e.message.channel.sendMessage(morpion_cmd.manage(args,e.message.author.username))                
            break;
            default:
                e.message.reply("type `~help`")
            // add any other commands here.
         }
        }
        catch(err)
        {
            console.log(err)
            e.message.channel.sendMessage("un électron quantique a tous cassé : "+err)     
        }
     }
});



/*
        <script type="text/javascript">
        var tour = false;
        var ia;
        var nombreTour = 0;
        var winner = "";
        var grilleContenu = 
        [
     [false,false,false],
     [false,false,false],
     [false,false,false]
    ];

    var grilleJoueur = 
        [
     [-1,-1,-1],
     [-1,-1,-1],
     [-1,-1,-1]
    ];

    if(document.getElementById("j1").value == "ia")
    {
        playIa();
    }

        function play(case01,x,y)
        {
                x=x-1;
                y=y-1;
                nombreTour=nombreTour+1;

                if(winner != "" || nombreTour>9 )
                {
                        reinit();
                }

                if(!case01.src)
                {
                        grilleContenu [x][y] = true;
                        grilleJoueur [x][y] = tour;

                        if(tour)
                        {
                                case01.src = "avatar.png";
                                ia = document.getElementById("j1").value == "ia";
                        }
                        else
                        {
                                case01.src="avatar.gif"
                                ia = document.getElementById("j2").value == "ia";
                        }
                        if(gainCol(y,tour,grilleJoueur) || gainligne(x,tour,grilleJoueur) || gainDiag(tour,grilleJoueur) )
                        {
                                win();
                                ia =false;
                        }

                        tour = !tour;


                        if(nombreTour < 9 && ia)
                        {
                                playIa();
                        }
                }
        }

        function alea()
        {
                return Math.floor(Math.random() * 3);
        }

        function cerveau(x,y,tourFictif,nombreFictif,tourIa,grilleJoueurFictif,grilleContenuFictif)
        {
                var gain = 0;
                var i;
                var j;

                grilleContenuFictif [x][y] = true;
                grilleJoueurFictif [x][y] = tourFictif;

                //console.log(nombreFictif,':',x,' ',y);
                if(nombreFictif > nombreTour+3)
                {
                        grilleContenuFictif [x][y] = false;
                        grilleJoueurFictif [x][y] = -1;
                        return 0;
                }
                else if(gainCol(y,tourFictif,grilleJoueurFictif) || gainligne(x,tourFictif,grilleJoueurFictif) || gainDiag(tourFictif,grilleJoueurFictif) && (tourFictif == tourIa))
                {
                        grilleContenuFictif [x][y] = false;
                        grilleJoueurFictif [x][y] = +1;
                        return 1;
                }
                else if(gainCol(y,tourFictif,grilleJoueurFictif) || gainligne(x,tourFictif,grilleJoueurFictif) || gainDiag(tourFictif,grilleJoueurFictif) && (tourFictif != tourIa))
                {
                        grilleContenuFictif [x][y] = false;
                        grilleJoueurFictif [x][y] = -1;
                        return +1;
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
                                                        gain = gain + cerveau(i,j,!tourFictif,nombreFictif+1,tourIa,grilleJoueurFictif,grilleContenuFictif);

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


        function playIa()
        {  
                if(nombreTour < 9)
                {
                        var x=1;
                        var y=1;
                        var end;
                        var i;
                        var y;
                        var bon = 999;


                        var temp;
                        do
                        {
                                for(i=0;i<3;i++)
                                {
                                        for(j=0;j<3;j++)
                                        {
                                                if(!grilleContenu[i][j])
                                                {
                                                        temp = cerveau(i,j,tour,nombreTour,tour,grilleJoueur,grilleContenu);
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
                        }while(grilleContenu[x][y])

                        grilleContenu [x][y] = true;
                        grilleJoueur [x][y] = tour;


                        if(tour)
                        {
                                document.getElementById((x*3)+y+1).src = "avatar.png";
                        }
                        else
                        {
                                document.getElementById((x*3)+y+1).src = "avatar.gif";
                        }

                        if(gainCol(y,tour,grilleJoueur) || gainligne(x,tour,grilleJoueur) || gainDiag(tour,grilleJoueur) )
                        {
                                        win();
                        }

                        tour = !tour;

                        nombreTour=nombreTour+1;
                }
        }



        function reinit()
        {
                alert("nouvelle partie!");
                nombreTour = 0;
                tour = false;
                winner = "";
                grilleContenu = 
                [
             [false,false,false],
             [false,false,false],
             [false,false,false]
            ];

            grilleJoueur = 
                [
             [-1,-1,-1],
             [-1,-1,-1],
             [-1,-1,-1]
            ];

            supprimgs();
            if(document.getElementById("j1").value == "ia")
        {
                playIa();
        }
            document.getElementById("winner").innerHTML = "partie en cours..."
        }


        function supprimgs()
        {
                var elems = document.getElementsByClassName("morpion");
                for (var i = 0; i < elems.length; i++) 
                {
                                elems[i].removeAttribute('src');
                }
        }

        function win()
        {
                if(!tour)
                {
                        winner = document.getElementById("j1").value;
                }
                else
                {
                        winner = document.getElementById("j2").value;
                }
                document.getElementById("winner").innerHTML = "Le gagnant est "+winner; 
        }

        function gainCol(y,tour,grille)
        {
                return (grille[0][y] == tour) && (grille[1][y] == tour) && (grille[2][y] == tour);
        }
        function gainligne(x,tour,grille)
        {
                return (grille[x][1] == tour) && (grille[x][2] == tour) && (grille[x][0] == tour);
        }
        function gainDiag(tour,grille)
        {
                return ((grille[0][0] == tour) && (grille[1][1] == tour) && (grille[2][2] == tour)) || ((grille[0][2] == tour) && (grille[1][1] == tour) && (grille[2][0] == tour))
        }
        </script>
*/