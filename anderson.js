const Request = require("request");
const Config = require("./config");
const Log = require("./log");
var anderson = {};

anderson.getMsg = function(message,first_name,last_name,channel)
{
	what = anderson.whatIsIt(message)
	message = message.toLowerCase()
	if(message == "yop" )	
		anderson.sendMsg("yop",channel)
	else if(what != null)
		anderson.sendDecription(what,channel,"fr")
	else if(anderson.isForHour(message))
		anderson.sendHour(channel)
	else if(anderson.isQuestion(message) && anderson.isMe(message))
		anderson.sendMsg("oui oui certainement",channel)
	else if(anderson.isMe(message) && anderson.hello(message))
		anderson.sendMsg("yo !",channel)
}

anderson.sendHour = function(channel)
{
	console.log("yop");
	var d = new Date();
    	var h = addZero(d.getHours());
    	var m = addZero(d.getMinutes());
	message = "il est "+ h + " heure " + m;
	//console.log(message);
	anderson.sendMsg(message,channel)
}

anderson.sendDecription = function(word,channel,lang)
{
	Request.get(
		{
			'uri':'https://www.wikidata.org/w/api.php?action=wbsearchentities&search='+word+'&language='+lang+'&format=json',
			//'uri':'https://www.wikidata.org/w/api.php?action=wbgetentities&sites='+lang+'wiki&titles='+word+'&format=json&props=descriptions' , 
			'encoding':'utf-8'
		},
		function (error, response, body) 
		{
  			if (!error && response.statusCode == 200) {
				resJson = JSON.parse(body)
				try
				{
					/*id = Object.keys(resJson.entities)[0]
					description = resJson.entities[id].descriptions.fr.value*/

					datas = resJson.search.forEach(element => {
						let description = element.description
						anderson.sendMsg("'"+description+"'",channel)
					});
					
  				}
				catch(err)
				{

				}
			}
			else
			{
				console.log("toto")
			}
		}
	)
}

anderson.sendMsg = function(message,channel)
{
	Request.post(
		{
			'uri':'https://api.telegram.org/'+Config.botKey+'/sendMessage', 
			form:{"chat_id":channel,"text":message},
			'encoding':'utf-8',
			headers: {
    				"Content-Type":"application/json; charset=utf-8"
  			}
		},
		function (error, response, body) 
		{
  			if (!error && response.statusCode == 200) {
    				console.log("yey")
  			}
			else
			{
				Log.error(body);
			}
		}
	)
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//search if <word> match with one of words in <list_words_search>
function isYourWord(list_words_search,word)
{
	return list_words_search.indexOf(word) > -1
}

//search if one of <list_words_search> are in <list_words_message>
function wordInYourMessage(list_words_message,list_words_search)
{
	return list_words_message.find((word) => 
	{
		return isYourWord(list_words_search,word)
	}) != null
}

//return true if one rules is correct with ele
function applyRulesOr(ele,list_rules)
{
	var res = false
	list_rules.forEach(rule => {
		if(rule(ele))
		{
			res = true
		}
	});

	return res
}

//return true if all rules are correct with ele
function applyRulesAnd(ele,list_rules)
{
	var res = true
	list_rules.forEach(rule => {
		if(! rule(ele))
		{
			res = false
		}
	});

	return res
}

const toTitleCase = (phrase) => {
	return phrase
	  .split(' ')
	  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
	  .join(' ');
  };


//test if message seems to be a question
anderson.isQuestion = function(message)
{
	var rules = []
	
	rules.push((list_words) => 
		wordInYourMessage(list_words,["qui","comment","quel","quoi"])
	)

	rules.push(
		(list_words) => message.indexOf("?") > -1
	)

	/*rules.push(
		(list_words) => isYourWord(["je","tu","il","nous","vous","ils"],list_words[1])
	)*/

	return applyRulesOr(message.split(/\.|\?|,|'|-| /),rules)
}

anderson.isMe = function(message)
{
	var rules = []
	
	rules.push((list_words) => 
		wordInYourMessage(list_words,["anderson","andy","@aurea_bot"])
	)

	return applyRulesOr(message.split(/\.|!|\?|,|'|-| /),rules)
}

anderson.hello = function(message)
{
	var rules = []
	rules.push((list_words) =>
		wordInYourMessage(list_words,["bonjour","hey","salut","hello","coucou"])
	)

	return applyRulesOr(message.split(/\.|!|\?|,|'|-| /),rules)
}


anderson.whatIsIt = function(message)
{
	//ex : qui est steve jobs?
	regex = RegExp("qui est (.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		return toTitleCase(res[1].trim()).replace(" ","_")
	}

	//ex : c'est quoi un|une accordéon? , c quoi ... 
	regex = RegExp("c(?:'est)? (?:quoi|koi) (?:la)?(?:une)?(?:un)?(?:du)?(?:de la)?(?:des)?(?:les)?(.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		
		
		res = toTitleCase(res[1].trim()).replace(" ","_")
		if(res[res.length - 1] == "s")
			return res.slice(0, -1); 
		else
			return res
	}

	regex = RegExp("c(?:'est)? (?:qui|ki) (.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		return toTitleCase(res[1].trim()).replace(" ","_")
	}
	
	return null
}

anderson.isForHour = function(message)
{
	var rules = []
	rules.push((list_words) => 
		wordInYourMessage(list_words,["quelle","quel"])
	)

	rules.push((list_words) => 
		wordInYourMessage(list_words,["heure","heure?"])
	)

	rules.push((list_words) => 
		wordInYourMessage(list_words,["est","est?"])
	)

	rules.push((list_words) => 
		wordInYourMessage(list_words,["il","il?"])
	)

	return applyRulesAnd(message.split(/\.|!|\?|,|'|-| /),rules)
}

module.exports = anderson;
