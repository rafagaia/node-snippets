const {
    isMainThread,
    workerData,
    Worker
} = require('worker_threads');

//cluster works such that each fork runs a node instance on its own process
//worker threads share the same process. And is not meant to handle http requests

if (isMainThread) {
    console.log(`Main Thread! processId: ${process.pid}`);
    new Worker(__filename, {
        workerData: [3, 1, 2, 4, 5]
    }); //__filename will point to threads.js
    new Worker(__filename, {
        workerData: [5, 4, 2, 1, 3]
    });
} else {
    console.log(`Worker Thread! processId: ${process.pid}`);
    console.log(`${workerData} sorted is: ${workerData.sort()}`);// this sort will block the worker thread, and the other array can be sorted by its own worker thread
}