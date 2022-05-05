const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'D Brane'
    },
    {
        id: 1,
        name: 'Einstein'
    }
];

//Routes:
app.get('/', (req, res) => {
    res.send({
        id: 42,
        name: 'Life Answerr'
    });
});

app.get('/friends', (req, res) => {
    res.json(friends);
});

//GET /friends/21
app.get('/friends/:id', (req, res) => {
    const friendId = Number(req.params.id); //or +req.params.id;
    const friend = friends[friendId];
    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({
            error: "Friend does not exist"
        });
    }
});

app.get('/messages', (req, res) => {
    res.send('<h1>YOYO TETHERRR</h1>')
});

app.post('/messages', (req, res) => {
    console.log('POST Message');
    res.send('send it');
});





app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}...`);
});
