const cluster = require('cluster');
const { cpus } = require('os');
const process = require('process');
const http = require('http');

const numCPUs = cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    //Fork Workers.
    for (let i = 0; i< numCPUs; i++) {
        cluster.fork();
    }

    //Subscribe to Cluster EventEmitter
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited`);
    });
} else {
    //Workers can share any TCP connection (HTTP, ...)
    //In this case it is and HTTP connection
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('wassup y\'all\n');
    }).listen(8181);

    console.log(`Worker ${process.pid} started...`);
}