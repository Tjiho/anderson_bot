check = {}

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