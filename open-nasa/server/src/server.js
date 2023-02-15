require('dotenv').config();
const http = require('http');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 8000;


async function startupServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    httpServer.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}...`);
    });

    //sockets.listen(socketServer);
}

startupServer();
