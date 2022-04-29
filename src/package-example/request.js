const axios = require('axios');


//in node, axios makes use of 'http' module from node.js
//supports Promise API -> can use async/await
//automatic transforms for JSON data
//can cancel requests after started, and can retrieve info on
//  request progress


axios.get('https://www.google.com')
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        console.log('All done!!!!');
    })