function getMessages(req, res) {
    res.send('<h1>YOYO TETHERRR</h1>')
}

function postMessage(req, res) {
    console.log('POST Message');
    res.send('send it');
}

module.exports = {
    getMessages,
    postMessage
}