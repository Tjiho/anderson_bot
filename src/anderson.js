//import { utimesSync } from "fs";

const Request = require("request");
const Config = require("../static values/config");
const Log = require("./log");
const Wikidata = require("./wikidata");
const Utils = require("./utils");
var anderson = {};

anderson.getMsg = function(message,first_name,last_name,channel)
{
	message = message.toLowerCase()
	what = anderson.whatIsIt(message)
	who = anderson.whoIsIt(message)
	infos = anderson.getInfoOf(message)

	if(message == "yop" )	
		anderson.sendMsg("yop",channel)
	else if(who != null)
		anderson.sendDecription(who,channel,"fr",Wikidata.isHuman,anderson.applyDescription)
	else if(what != null)
		anderson.sendDecription(what,channel,"fr",Wikidata.isNotHuman,anderson.applyDescription)
	else if(infos != null)
		anderson.sendDecription(infos[1],channel,"fr",Wikidata.isHuman,(e) => anderson.applyInfos(e,infos))
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



//search a word and send a custom description generate by <displayfunction> for all result which contains this word and match with <check function>
// - word : word for which we want a description
// - channel : telegram channel on which we will send the message
// - lang : search language (fr)
// - checkfunction : a filter on the result (ex : <Wikidata.isHuman> to get just human result)
// - dislayfunction : function whick will organise what infos we will display about each result (ex: <anderson.applydescription> to get the label and the description)
anderson.sendDecription = function(word,channel,lang,checkfunction,displayFunction)
{
	Wikidata.searchElement(word.toLowerCase())
	.then((data) => 
	{
		Utils.promisesToArray(data.map(checkfunction)).then((data) =>  
		{
			list_promises = data.map(displayFunction)
			Utils.promisesToArray(list_promises).then((results) =>
			{
				if(results.length > 0)
				{
					var rep = ""
					results.forEach(element => {
						rep += element + "\n"
					})
					anderson.sendMsg(rep,channel)
				}
				else
					rep = "je sais pas"
			})
			.catch((error) =>
			{
				console.log(error)
			})	

		})
		.catch((error) =>
		{
			console.log(error)
		})	
	})
	.catch((error) =>
	{
		console.log(error)
	})
}


//display the label and the value of the attribute in <infos[0]>
anderson.applyInfos = function(wikidata_element,infos)
{
	return new Promise((resolve, reject) => 
	{
		wikidata_element.getLabel("fr").then((label) =>
		{
			wikidata_element.getClaimByName(infos[0]).then((value) =>
			{
				resolve(label+" : "+value)
			})
			.catch((error) =>
			{
				reject(error)
			})
		})
		.catch((error) =>
		{
			reject(error)
		})
		
	})
}


//display the label and the description
anderson.applyDescription = function(wikidata_element)
{
	return new Promise((resolve, reject) => 
	{
		wikidata_element.getLabel("fr").then((label) =>
		{
			wikidata_element.getDescription("fr").then((description) =>
			{
				resolve(label+" :"+description)
			})
			.catch((error) =>
			{
				reject(error)
			})
		})
		.catch((error) =>
		{
			reject(error)
		})
		
	})
}

//send telegram message on a channel
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

	//ex : c'est quoi un|une accordéon? , c quoi ... 
	regex = RegExp("c(?:'est)? (?:quoi|koi) (?:le)?(?:la)?(?:une)?(?:un)?(?:du)?(?:de la)?(?:des)?(?:les)?(.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		
		
		res = toTitleCase(res[1].trim()).replace(" ","_")
		if(res[res.length - 1] == "s")
			return res.slice(0, -1); 
		else
			return res
	}

	return null
}

anderson.whoIsIt = function(message)
{
	//ex : qui est steve jobs?
	regex = RegExp("qui est (.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		return toTitleCase(res[1].trim())
	}

	regex = RegExp("c(?:'est)? (?:qui|ki) (.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		return toTitleCase(res[1].trim())
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

anderson.getInfoOf = function(message)
{
	regex = RegExp("(?:quelle|quel) est (?:le|la|l')(.*) (?:de|du|d'une|d'un|des|d')(.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		return [res[1].trim(),res[2].trim()]
	}
}

module.exports = anderson;
