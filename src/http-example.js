const { request, get } = require('https');

// const req = request('https://www.google.com', (res) => {
//     res.on('data', (chunk) => {
//         console.log(`Data chunk: ${chunk}`)
//     });
//     res.on('end', () => {
//         console.log('No more Data');
//     })
// });

//sends the request:
//req.end();
//but if we use 'get', we don't need it, as it's called by get

get('https://www.google.com', (res) => {
    res.on('data', (chunk) => {
        console.log(`Data chunk: ${chunk}`)
    });
    res.on('end', () => {
        console.log('No more Data');
    })
});