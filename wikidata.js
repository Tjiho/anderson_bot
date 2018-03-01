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

//represent a wikidataElement
class Instance
{

	static constructWithCache(id)
	{
		if(this.cache_instance === undefined)
		{
			this.cache_instance = {}
		}

		if(id in this.cache_instance)
		{
			return this.cache_instance[id]
		}
		else
		{
			let instance = new Instance(id)
			this.cache_instance[id] = instance
			return instance
		}
	}

	constructor(id)
	{
		this.id = id
		this.cache = null
		this.claims = {}
		
	}

	getPropertyById(id)
	{
		return new Promise((resolve, reject) => 
		{
			
			this.getClaimByid(id)
				.then((data) =>
				{
					resolve(this.claims[id])	
				})
				.catch((error) =>
				{
					reject(error)
				})
		})
	}

	getProperty(property)
	{
		return "toto"
	}

	getLabel (lang = "fr")
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

	getDescription(lang = "fr")
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
				.catch((data) =>
				{
					resolve("[vide]")
				})
		})
	}
	

	getClaimByid(id,lang = "fr")
	{
		return new Promise((resolve, reject) => 
		{
			this.requestEntity().then((data) =>
			{
				let list_claim = data.claims
				if(id in list_claim)
				{
					try
					{
						let claim_type = list_claim[id][0].mainsnak.datavalue.type
						
						// let claim_entity = instance.constructWithCache(id)
						if(claim_type == "string")
						{
							this.claims[id] = list_claim[id][0].mainsnak.datavalue.value
							resolve(id)
						}
						else if(claim_type == "wikibase-entityid")
						{
							
							let info_entity = Instance.constructWithCache(list_claim[id][0].mainsnak.datavalue.value.id)
							info_entity.getLabel(lang).then((label) =>
							{
								this.claims[id] = label
								resolve(id)
							})
						}
						else
						{
							reject("claim - not implemented")
						}
					}
					catch(error)
					{
						reject("cannot access claim info " + error)
					}
				}
				else
				{
					reject("claim not found")
				}
			})
			.catch((error) =>
			{
				reject(error)
			})
				
		})
	}


	//do request to get the entity
	requestEntity()
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


wikidata.instance = Instance

//do a search on the wikidata api
//return a list of <Instance> which match with the name searched
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

	//get a search element and check if it's valid with the search
	var validElement = function(element)
	{
		return new Promise((resolve, reject) => 
		{
			if(element.match.language == lang)
				if("description" in element) // we keep just element with a description
					if(element.description != 'Wikimedia disambiguation page') // and we eject some result
					{
						let instance = wikidata.instance.constructWithCache(element.id)
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

wikidata.is_human = function(instance)
{
	return new Promise((resolve, reject) => 
	{
		instance.getPropertyById("P31").then((instance_of) =>
		{
			if(instance_of == "être humain")
				resolve(instance)
			else
				reject("not human")
		})
		.catch((error) =>
		{
			reject("not human")
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
				
				wikidata.is_human(element).then((a) =>
				{
					console.log("[h]" +label+" :"+description)
				})
				.catch((error) =>
				{
					console.log("[O]" +label+" :"+description)
				})
			})
		})
	});
})
.catch((error) =>
{
	console.log(error)
})
*/
module.exports = wikidata;
