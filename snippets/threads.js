const { 
    Worker,
    isMainThread,
    resourceLimits,
    threadId,
    workerData
 } = require('worker_threads');




console.log(`resourceLimits: ${Object.entries(resourceLimits)}...\n`);

if (isMainThread) {
    console.log(`Thread process_id: ${process.pid}\nMain thread_id: ${threadId}...`);
    
    new Worker(__filename, {
        workerData: ['Kepler 62 f']
    });

    new Worker(__filename, {
        workerData: ['Kepler 442-b']
    });
} else {
    console.log(`Worker thread_id:${threadId}`);
    console.log(`workerData: ${workerData}\n\n`);
}
