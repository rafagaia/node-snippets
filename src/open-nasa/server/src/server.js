require('dotenv').config()
const http = require('http');
const mongoose = require('mongoose');
//const io = require("socket.io");


const apiServer = require('./api');
const httpServer = http.createServer(apiServer);
//const socketServer = io(httpServer);

//const sockets = require('./sockets');

const PORT = process.env.PORT || 8000;

const MONGO_URL = "mongodb+srv://nasa-api:5WdqabrSBYhslQ96@nasacluster.cutrt.mongodb.net/?retryWrites=true&w=majority";

console.log(`MONGO_URL: ${MONGO_URL}`);
//mongoose event emitter that emits events when connection is ready or when there's errors
//since only triggered once, can use 'once' instead of 'on', so that event only triggers callback once.
mongoose.connection.once('open', () => {
    console.log('MongoDB Connection Ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(`[MONGOOSE_ERROR] Connection Err: ${err}...`);
});

const { loadPlanetsData } = require('./models/planets.model');

async function startupServer() {
    await mongoose.connect(MONGO_URL);/*, {
        useNewUrlParser: true, //determines how mongoose parses URL string
        useFindAndModify: false, //disables outdated way of updating mongo data
        useCreateIndex: true, //uses create index way instead on old ensure index
        useUnifiedTopology: true //mongoose will use updated way of talking to clusters of mongo databases
    }*/ //commented out because we're using Mongoose version higher than 6.
    await loadPlanetsData();

    httpServer.listen(PORT, () => {
        console.log(`Server Listening on Port ${PORT}...`);
    });

    //sockets.listen(socketServer);
}

startupServer();
