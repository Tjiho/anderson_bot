const Check = require("../share/check")
const config = require('../static values/config')
const Damn = require('../share/damn/index');

exports["action"] = function(message,f_reply,f_send,client)
{

	function getRandomInt(max) 
	{
		return Math.floor(Math.random() * Math.floor(max));
	}	

	var args = message.split(' ');
    var cmd = args[0]
    var args = args.splice(1);

	if(args.length > 0)
	{
		
		var http_arg = {}
		http_arg["limit"] = 1

		Damn.clientCredentials(config.deviantArt_id, config.deviantArt_secret)
			.then(damn => {
				damn.userProfile(args[0]).then(dailyDeviations => {
					http_arg["offset"] = getRandomInt(dailyDeviations.stats.user_deviations)
					damn.galleryAll(args[0],http_arg)
					.then(dailyDeviations => {
						dailyDeviations.forEach(element => {
							if(element.preview)
								f_send(element.preview.src)
						});
					})
				})

				

			})
	}
}

exports["test"] = (message) => Check.checkCmd(message,["deviant"])


exports["help"] = 
{
    cmd:["deviant <username>"],
    help:"send random image from deviantArt"
}
