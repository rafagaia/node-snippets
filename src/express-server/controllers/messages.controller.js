const path = require('path');

function getMessages(req, res) {
   res.send('<h1>YOYO TETHERRR</h1>')
}

function postMessage(req, res) {
    console.log('POST Message');
    res.send('send it');
}

function getFile(req, res) {
    res.sendFile(
        path.join(__dirname,'..', 'public', 'images', 'skimountain.jpg')
    );
}

module.exports = {
    getMessages,
    postMessage,
    getFile,
}