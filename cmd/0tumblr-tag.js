const Check = require("../share/check")
const config = require('../static values/config')
exports["action"] = function(message,f_reply,f_send)
{
   var Tumblr = require('tumblrwks');

/*
 *   You can get the consumerKey and consumerSecret by registing a tumblr app: http://www.tumblr.com/oauth/apps
 *   */

	var tumblr = new Tumblr(
  	{
    		consumerKey: config.tumblr,
  		consumerSecret: config.tumblrSecret
	}) // specify the blog url now or the time you want to use

    	filterImage = function(ele)
	{
		console.log(ele.type)
		return ele.type = "photo"	
	}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function performOauthQuery(request, options, callback) {
    return new Promise(function (resolve, reject) {
        request.addListener('response', function (response) {
            handleResponse(options, callback, response)
                .catch(reject)
                .then(resolve);
        });

        request.on('error', function (error) {
            handleError(callback, error);
            reject(error);
        });

        request.end();
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}	
	var args = message.split(' ');
    	cmd = args[0]
    	args = args.splice(1);
	console.log(args[1])
    	if(args.length > 1)
    	{
		//console.log(tumblr.oa)
		performOauthQuery(tumblr.oa.get("http://api.tumblr.com/v2/tagged?tag="+args[1], tumblr.accessToken, tumblr.accessSecret), 
					{
        					expectedStatusCodes : [200]
					},
			function(err, json){
				console.log(err)
				//var randomm = getRandomInt(json.total_posts)
				posts = shuffle(json)
				if(posts && posts.length > 0)
				{
				first = posts[0]
				photo = first.photos
				if(photo)
					f_send(photo[0].original_size.url)
				else
					f_send("plop")
				}
				else
					f_reply("sorry images not found")
		});
		
	}
}
function handleResponse (options, callback, response) {
    callback = callback || function () {};
    options = options || {}
    options.expectedStatusCodes = options.expectedStatusCodes || [200];

    var body = '';
    response.setEncoding('utf8');
    response.addListener('data', function (chunk) {
        body += chunk;
    });

    return new Promise(function (resolve, reject) {
        response.addListener('end', function () {
            if (options.expectedStatusCodes.indexOf(response.statusCode) !== -1) {
                var parsedResponse = JSON.parse(body).response;
                callback(null, parsedResponse);
                resolve(parsedResponse);
            } else {
                var error = new Error(body);
                handleError(callback, error);
                reject(error);
            }
        });
    });
}
function handleError(callback, error) {
    callback(error);
}

exports["test"] = (message) => Check.checkCmd(message,["tumblr","tag"])


exports["help"] = 
{
    cmd:["tumblr tag <tag>"],
    help:"send a random image with this tag"
}
