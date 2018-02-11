const Express = require('express')
const Server = Express()
const Config = require('./config')
const BodyParser = require('body-parser')

Server.use(BodyParser.json()); // for parsing application/json
Server.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

Server.post('/update/'+Config.key,(req, res) =>
{
    console.log(req.body)
    res.send("ok")
})


Server.get('/', (req, res) =>
{
        res.send('Hello World!')
})

Server.listen(3000, () => 
{
    console.log('Anderson server is listening on port 3000!')
    console.log('Anderson server is listening on port 3000!')
})