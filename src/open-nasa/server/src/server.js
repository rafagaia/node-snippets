require('dotenv').config()
const http = require('http');
//const io = require("socket.io");


const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
//const socketServer = io(httpServer);

//const sockets = require('./sockets');

const PORT = process.env.PORT || 8000;
const { loadPlanetsData } = require('./models/planets.model');

async function startupServer() {
    await loadPlanetsData();

    httpServer.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}...`);
    });

    //sockets.listen(socketServer);
}

startupServer();
