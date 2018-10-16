check = {}

check.numberWords = function(message,number)
{
	return message.split(' ').length < number+1
}

check.beginWith = function(message,keyword,check_case = false)
{
    if(!check_case)
        message = message.toLowerCase()

    var args = message.split(' ');    
    return (args[0].indexOf(keyword) == 0)

}


check.checkCmd = function(message,list_keywords,check_case = false)
{
    if(!check_case)
        message = message.toLowerCase()

    var args = message.split(' ');    

    var index = 0;

    for(index in list_keywords)
    {
        if(args[index] != list_keywords[index])
        {
            return false 
        }
         
    }

    return true
}

module.exports = check
