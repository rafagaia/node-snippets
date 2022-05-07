const path = require('path');

function getMessages(req, res) {
   res.render('messages', {
       title: 'Message to a Friend',
       friend: 'Rafa'
   });
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