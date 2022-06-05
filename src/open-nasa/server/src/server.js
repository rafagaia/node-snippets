require('dotenv').config()
const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startupServer() {
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}...`);
    });
}

startupServer();
