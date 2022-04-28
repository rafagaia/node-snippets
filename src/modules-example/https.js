// When we use the require function, we're using CommonJS standard:
//const { send, REQUEST_TIMEOUT } = require('./internals/request');

//also have EcmaScript standard (ES6 modules):
// import { send } from './request';
// and with imports, its necessary to include file extension, such as ./request.mjs or .js
// when using relative paths

//since read is exported as function, can do:
//const read = require('./internals/response');
//However, best practice to stick with module.exports = {} at the end of each module file


//if using index.js (basic way):
//const internals = require('./internals');
// function makeRequest(url, data) {
//     internals.request.send(url, data);
//     return internals.response.read(); //instead of requiring response, and doing response.read
// }

//better way:
const { send, read } = require('./internals');

function makeRequest(url, data) {
    send(url, data);
    return read(); //instead of requiring response, and doing response.read
}


const responseData = makeRequest('https://google.com', 'hello google');

console.log(`responseData: ${responseData}\n`);





