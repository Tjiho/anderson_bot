const Config = require("../static values/config");
const Fs = require("fs");
var log = {};

log.error = function(txt)
{
	Fs.appendFile(Config.error, txt+"\n", function(err) {
    	if(err) {
        	console.log("unable to write error file")
    	}

    		console.log("error were saved to "+Config.error);
	}); 

}


log.log = function(title,txt)
{
	Fs.appendFile(Config.log,"\n\n"+title+"\n===========\n"+JSON.stringify(txt), function(err) {
    	if(err) {
        	console.log("unable to write log file")
    	}

    		console.log("log were saved to "+Config.log);
	}); 

}
module.exports = log;
