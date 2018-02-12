const Request = require("request");
const Config = require("./config");
var anderson = {};

anderson.getMsg = function(message,first_name,last_name,channel)
{
	if(message == "yop")	
		anderson.sendMsg("yop",channel);
	else if(anderson.isQuestion(message))
		anderson.sendMsg("hum... bonne question",channel)
}
anderson.sendMsg = function(message,channel)
{
	Request('https://api.telegram.org/'+Config.botKey+'/sendMessage?chat_id='+channel+'&text="'+message+'"', 
		function (error, response, body) 
		{
  			if (!error && response.statusCode == 200) {
    				console.log("yey")
  			}
		}
	)
}

function isYourWord(array,ele)
{
	return array.indexOf(ele) > -1
}

function applyRules(ele,list_rules)
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

anderson.isQuestion = function(message)
{
	var list_words = message.split(" ")
	var rules = []
	
	rules.push((array) => {
		return array.find((ele) => 
		{
			return isYourWord(["qui","comment","quel","quoi"],ele)
		}) != null
	})
	rules.push(
		(array) => message.indexOf("?") > -1
	)
	rules.push((array) => isYourWord(["je","tu","il","nous","vous","ils"],array[1]))

	return applyRules(list_words,rules)
}




module.exports = anderson;
