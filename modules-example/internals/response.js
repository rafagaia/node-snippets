//fake decrypt
function decrypt(data) {
    return 'decrypted data';
}

//if we're only exporting One function from our module, can do:
// module.exports = function read() {
//     return decrypt('data');
// }

function read() {
    return decrypt('data');
}


/*
    EcmaScript way of exporting:
*/
// export {
//     read,
// };
/* 
    Note: need to set "type": "module" in the package.json
    as CommonJS way is standard for backwards compatibility reasons

    OR: rename module filenames with .mjs extension instead of .js
*/


/*
    However, if we have a choice, it's better to stick
    with module.exports = {} so it's clear what the interface
    to our module will be
*/

module.exports = {
    read,
};