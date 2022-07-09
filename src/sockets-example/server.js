const http = require('http');
const socketIo = require('socket.io');


//const apiServer = require('./api) , if Express or similar is needed.

const httpServer = http.createServer();
//const socketServer = io()



module.exports = async function startupServer() {
    httpServer.listen(8000, () => {
        console.log(`HTTPServer listening on Port 8000...`);
    });


    //sockets.listen(socketServer);
}