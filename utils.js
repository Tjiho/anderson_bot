var utils = {};

utils.promisesToArray = function(list_promises)
{
    return new Promise((resolve, reject) => 
	{
        const successHandler = result => ({ payload: result, resolved: true });
        const catchHandler = error => ({ payload: error, resolved: false });

        function solveAll(promise)
        {
            return promise.then(successHandler).catch(catchHandler)
        }

        list_promises_solvables = list_promises.map(solveAll)

        Promise.all(list_promises_solvables)
        .then(results => resolve(results.filter(result => result.resolved).map(result => result.payload))) // Then ["Resolved!", "Rejected!"]
        .catch(err => reject(err));
    })
}

utils.oMap = (o, f) => Object.assign(...Object.keys(o).map(k => ({ [k]: f(o[k]) })))

module.exports = utils;