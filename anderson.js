const Request = require("request");
const Config = require("./config");
var anderson = {};

anderson.getMsg = function(message,first_name,last_name,channel)
{
	
	anderson.sendMsg("yop",channel);
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

module.exports = anderson;
