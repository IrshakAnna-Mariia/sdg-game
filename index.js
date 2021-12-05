const express = require('express')
const { resolve } = require('path')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const URL = "mongodb+srv://gameUser:gameUser@cluster0.mwrdr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;
const Item = require('./models/Item')

const server = express();
server.use(express.urlencoded({ extended: false }))
const httpServer = require('http').createServer(server);

server.use(express.static(
    resolve(__dirname, "client", "build")
));

server.use(bodyParser.json());

server.use('/game/api/inventory/', require('./routes/inventory.route'))

async function start() {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        httpServer.listen(PORT, () => console.log(`Do it! Port: ${PORT}`))
    } catch (err) {
        console.log('Error', err.message)
        process.exit(1)
    }
}

start();
