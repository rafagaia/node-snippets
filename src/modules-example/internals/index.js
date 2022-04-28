//better way:
/*const request = require('./request');
const response = require('./response');

module.exports = {
    REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
    send: request.send,
    read: response.read,
};
*/

//even better way, using spread operator:
module.exports = {
    ...require('./request'), //takes all the properties in the module and unpacks them
    ...require('./response'),
};


// basic way:
// module.exports = {
//     request: require('./request'),
//     response: require('./response'),
// };