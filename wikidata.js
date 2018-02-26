const rp = require('request-promise');
const Config = require("./config");
const Log = require("./log");
var wikidata = {};


/*
TODO:
Wikidata proxy : 
- static search element => renvoie liste de wikidataElement
    - language default = fr
- public listeAttributes => renvoie la liste des attributs de l'element.
- public getAttribute(att) => renvoie la value de l'attribute


*/

wikidata.instance = function(id)
{
	this.id = id;
	this.cache = null

	this.getProperty = function(property)
	{
		return "toto"
	}

	this.getLabel = function(lang)
	{
		return new Promise((resolve, reject) => 
		{
			this.requestEntity()
				.then((data) =>
				{
					resolve(data.labels[lang].value)
				})
		})
	}

	this.getDescription = function(lang)
	{
		return new Promise((resolve, reject) => 
		{
			this.requestEntity()
				.then((data) =>
				{
					resolve(data.descriptions[lang].value)
				})
		})
	}

	//do request to get the entity
	this.requestEntity = function()
	{
		var options = {
			uri: 'https://www.wikidata.org/w/api.php',
			qs: {
				action: 'wbgetentities',
				ids: this.id,
				format: 'json'
			},
			headers: {
				'User-Agent': 'Anderson-bot/0.1 request-promise'
			},
			json: true // Automatically parses the JSON string in the response
		}

		return new Promise((resolve, reject) => 
		{
			if(this.cache != null)
				resolve(this.cache)
			else
			{
				rp(options)
					.then((data) => 
					{
						if("entities" in data)
							if(this.id in data.entities)
							{
								this.cache = data.entities[this.id]
								resolve(this.cache)
							}
							else
								reject("api error")
						else
							reject("api error")
					})
			}
		})

	}
	//https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q42&format=jsonfm
}

wikidata.searchElement = function(name,lang = "fr")
{
	var options = {
		uri: 'https://www.wikidata.org/w/api.php',
		qs: {
			action: 'wbsearchentities',
			search: name,
			language: lang,
			format: 'json',
			limit: '50'
		},
		headers: {
			'User-Agent': 'Anderson-bot/0.1 request-promise'
		},
		json: true // Automatically parses the JSON string in the response
	};

	var list_instances = []

	return new Promise((resolve, reject) => 
	{
		rp(options)
			.then((data) => 
			{
				//console.log(data);
				if("search" in data)
				{
					data.search.forEach(element => {
						if(element.match.language == lang)
						{
							if("description" in element) // we keep just element with a description
							{
								if(element.description != 'Wikimedia disambiguation page') // and we eject some result
									list_instances.push(new wikidata.instance(element.id))
							}
						}
					});
					resolve(list_instances)
				}
				else
				{
					reject("api error")
				}
				
			})
	})
}

/*
wikidata.searchElement("chaise")
	.then((data) => 
	{
		data[0].getLabel("fr").then((data) =>
		{
			console.log(data)
		})

		data[0].getDescription("fr").then((data) =>
		{
			console.log(data)
		})
	})
	.catch((error) =>
	{
		console.log(error)
	})
*/

module.exports = wikidata;
