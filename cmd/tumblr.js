const Check = require("../share/check")
const config = require('../config')
exports["action"] = function(message,f_reply,f_send)
{
   var Tumblr = require('tumblrwks');

/*
 *   You can get the consumerKey and consumerSecret by registing a tumblr app: http://www.tumblr.com/oauth/apps
 *   */

	var tumblr = new Tumblr(
  	{
    		consumerKey: config.tumblr
  	}) // specify the blog url now or the time you want to use

    	filterImage = function(ele)
	{
		console.log(ele.type)
		return ele.type = "photo"	
	}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}	
	var args = message.split(' ');
    	cmd = args[0]
    	args = args.splice(1);

    	if(args.length > 0)
    	{
    		tumblr.get('/posts', {limit:1,type:"photo",hostname: args[0]+'.tumblr.com'}, function(err, json){
			//console.log(json.total_posts)
			var randomm = getRandomInt(json.total_posts)
			console.log(randomm)
    			if(randomm > 0)
				tumblr.get('/posts', {limit:2, offset:randomm,type:"photo",hostname: args[0]+'.tumblr.com'}, function(err, json){			
					posts = json.posts
					first = posts[0]
					photo = first.photos
					if(photo)
						f_send(photo[0].original_size.url)
					else
						f_send(message)
				});
			
			//posts = json.posts.filter(filterImage)
			//first = posts[0]
			//photo = first.photos
			//console.log(first)
			//.original_size.url)
		});
	}
}

exports["test"] = (message) => Check.checkCmd(message,["tumblr"])


exports["help"] = 
{
    cmd:["tumblr <tumblr_name>"],
    help:"send a random image from this tumblr blog"
}
