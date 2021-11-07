const express = require('express')
const {resolve} = require('path')
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8000;

const server = express();
server.use(express.urlencoded({ extended: false}))
const httpServer = require('http').createServer(server);

server.use(express.static(
    resolve(__dirname, "client", "build")
));

server.use(bodyParser.json());

async function start() {
    try{
        httpServer.listen(PORT, () => console.log(`Do it! Port: ${PORT}`))
    } catch (err) {
        console.log('Error', err.message)
        process.exit(1)
    }
}

start();
