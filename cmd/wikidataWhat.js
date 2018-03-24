const sendDescription = require("../share/promiseAndCo")["sendDescription"]
const Wikidata = require("../share/wikidata")

exports["action"] = function(message,f_reply,f_send)
{
    what = whatIsIt(message)    
    sendDescription(what,"fr",Wikidata.isNotHuman,applyDescription,f_reply)
}

exports["test"] = (message) => (whatIsIt(message) != null)

exports["help"] = 
{
    cmd:["c'est quoi <objet>?"],
    help:"anderson tente de repondre"
}



whatIsIt = function(message)
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