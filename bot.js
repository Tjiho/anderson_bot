const Express = require('express')
const Server = Express()
const Config = require('./config')
const BodyParser = require('body-parser')
const Anderson = require('./anderson')

Server.use(BodyParser.json()); // for parsing application/json
Server.use(BodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

Server.post('/update/'+Config.key,(req, res) =>
{
    console.log(req.body)
    Anderson.getMsg(req.body.message.text, req.body.message.from.first_name, req.body.message.from.last_name, req.body.message.chat.id)
    res.send("ok")
})


Server.get('/', (req, res) =>
{
        res.send('Hello World!')
})

Server.listen(3456, () => 
{
    console.log('Anderson server is listening on port 3000!')
    console.log('Anderson server is listening on port 3000!')
})
