const sendDescription = require("../share/promiseAndCo")["sendDescription"]
const Wikidata = require("../share/wikidata")

exports["action"] = function(message,f_reply,f_send)
{
    infos = getInfoOf(message)
    sendDescription(infos[1],"fr",Wikidata.isHuman,(e) => applyInfos(e,infos),f_reply)
}

exports["test"] = (message) => (getInfoOf(message) != null)

exports["help"] = 
{
    cmd:["demande un info sur qq un qqchose"],
    help:"anderson tente de repondre"
}



function getInfoOf(message)
{
	regex = RegExp("(?:quelle|quel) est (?:le|la|l')(.*) (?:de|du|d'une|d'un|des|d')(.*)\\?")
	res = regex.exec(message)
	if(res != null)
	{
		return [res[1].trim(),res[2].trim()]
	}
}

function applyInfos(wikidata_element,infos)
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