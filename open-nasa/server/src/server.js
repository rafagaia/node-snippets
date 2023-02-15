require('dotenv').config();
const http = require('http');
const { mongoConnect } = require('./services/mongo');


const app = require('./app');
const httpServer = http.createServer(app);

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
