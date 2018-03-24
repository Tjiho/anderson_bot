const Wikidata = require("./wikidata")
const Utils = require("./utils")


exports["sendDescription"] = function(word,lang,checkfunction,displayFunction,f_send)
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
					f_send(rep)
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