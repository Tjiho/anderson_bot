const Rp = require('request-promise');
const Config = require("./config");
const Log = require("./log");
const Utils = require("./utils");
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
					try{
						resolve(data.labels[lang].value)
					}
					catch(error)
					{
						resolve("[vide]")
					}
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
					try{
						resolve(data.descriptions[lang].value)
					}
					catch(error)
					{
						resolve("[vide]")
					}
					
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
				Rp(options)
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

	//check if we keep the result or not
	var validElement = function(element)
	{
		return new Promise((resolve, reject) => 
		{
			if(element.match.language == lang)
				if("description" in element) // we keep just element with a description
					if(element.description != 'Wikimedia disambiguation page') // and we eject some result
					{
						let instance = new wikidata.instance(element.id)
						instance.getLabel(lang).then((label) =>
						{
							if(label.toLowerCase().indexOf(name) > -1)
								resolve(instance)
							else
								reject("not valid")
						})
					}
					else
						reject("not valid")
				else
					reject("not valid")
			else
				reject("not valid")					
		})
	}

	var list_instances = []

	return new Promise((resolve, reject) => 
	{
		Rp(options).then((data) => 
		{
			if("search" in data)
			{

				var actions = data.search.map(validElement)

				

				Utils.promisesToArray(actions)
				.then(results => resolve(results)) // Then ["Resolved!", "Rejected!"]
				.catch(err => reject(err));
			}
			else
			{
				reject("api error")
			}				
		})
	})
}

/*
wikidata.searchElement("pierre").then((data) => 
{
	//console.log(data)
	data.forEach(element => {
		element.getLabel("fr").then((label) =>
		{
			element.getDescription("fr").then((description) =>
			{
				console.log(label+" :"+description)
			})
		})
	});
})
.catch((error) =>
{
	console.log(error)
})*/

module.exports = wikidata;
