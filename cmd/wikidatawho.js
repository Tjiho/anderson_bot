const sendDescription = require("../share/promiseAndCo")["sendDescription"]
const Wikidata = require("../share/wikidata")

exports["action"] = function(message,f_reply,f_send)
{
    who = whoIsIt(message)
    
    sendDescription(who,"fr",Wikidata.isHuman,applyDescription,f_reply)
}

exports["test"] = (message) => (whoIsIt(message) != null)

exports["help"] = 
{
    cmd:["qui est <personnalité>?"],
    help:"anderson tente de repondre"
}


whoIsIt = function(message)
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


applyDescription = function(wikidata_element)
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


const toTitleCase = (phrase) => {
	return phrase
	  .split(' ')
	  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
	  .join(' ');
  };