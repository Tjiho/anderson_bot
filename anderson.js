const Request = require("request");
const Config = require("./config");
const Log = require("./log");
var anderson = {};

anderson.getMsg = function(message,first_name,last_name,channel)
{
	console.log(anderson.isForHour(message))
	if(message == "yop")	
		anderson.sendMsg("yop",channel)
	else if(anderson.isForHour(message))
		anderson.sendHour(channel)
	else if(anderson.isQuestion(message))
		anderson.sendMsg("oui oui certainement",channel)
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

anderson.sendMsg = function(message,channel)
{
	Request.get(
		{
			'uri':'https://api.telegram.org/'+Config.botKey+'/sendMessage?chat_id='+channel+'&text='+message, 
			'encoding':'utf-8'
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

	rules.push(
		(list_words) => isYourWord(["je","tu","il","nous","vous","ils"],list_words[1])
	)

	return applyRulesOr(message.split(" "),rules)
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

	return applyRulesAnd(message.split(" "),rules)
}

module.exports = anderson;
