require('dotenv').config();
const fs = require('fs');
// const http = require('http');
const https = require('https');
const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

// const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync('secrets/key.pem'),
    cert: fs.readFileSync('secrets/cert.pem')
}, app);

const PORT = process.env.PORT || 8000;


async function startupServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    httpsServer.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}...`);
    });

    //sockets.listen(socketServer);
}

startupServer();
