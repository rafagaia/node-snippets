const numeral = require('numeral');

setInterval(() => {
    const {rss, heaptotal} = process.memoryUsage();
    console.log('rss', numeral(rss).format('0.0 ib'),
                'heapTotal', numeral(heaptotal).format('0.0 ib'));
}, 5000);


//rss: resident set size -> the amount of RAM your node process is consuming
    //if rss is going up when we dont expect it to, it's likely a memory leak
//heapTotal: total space available for javascript objects presently
    //if memory leak, then heapTotal also goes up
//external: amount of memory consumed by off-heap data (buffers) used by node
//heapUsed: total space occupied by javascript objects presently
