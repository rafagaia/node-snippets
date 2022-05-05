const express = require('express');

const app = express();

const PORT = 3000;


//Routes:
app.get('/', (req, res) => {
    res.send({
        id: 42,
        name: 'Life Answerr'
    });
});

app.get('/messages', (req, res) => {
    res.send('<h1>YOYO TETHERRR</h1>')
});

app.post('/messages', (req, res) => {
    console.log('POST Message');
    res.send('send it');
})





app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}...`);
});
