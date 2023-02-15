module.exports.REQUEST_TIMEOUT = 500;

//fake encrypt
function encrypt(data) {
    return 'encrypted data';
}

//doing module.exports is not necessary... short-hand syntax:
exports.send = function send(url, data) {
    const encryptedData = encrypt(data);
    console.log(`Sending \'${encryptedData}\' to ${url}`);
}


//can export like this, or inline with function as above
// module.exports = {
//     REQUEST_TIMEOUT,
//     send,
// };
// **** This Above way is best practice, though.