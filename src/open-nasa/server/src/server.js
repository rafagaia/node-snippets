require('dotenv').config();
const http = require('http');
const { mongoConnect } = require('./services/mongo');
//const io = require("socket.io");


const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
//const socketServer = io(httpServer);

//const sockets = require('./sockets');

const PORT = process.env.PORT || 8000;

const { loadPlanetsData } = require('./models/planets.model');

async function startupServer() {
    await mongoConnect();
    
    await loadPlanetsData();

    httpServer.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}...`);
    });

    //sockets.listen(socketServer);
}

startupServer();
