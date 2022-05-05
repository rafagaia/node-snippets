const express = require('express');

const friendsController = require('./controllers/friends.controller');
const messagesController = require('./controllers/messages.controller');

const app = express();

const PORT = 3000;

/*
* Middleware:
*/

//Time logging:
app.use((req, res, next) => {
    const start = Date.now();
    //pass request to correct handler:
    next();
    //Route handler returns flow of execution back here
    const delta = Date.now() - start;
    console.log(`${req.method}  ${req.url}  ${delta}ms\n`);
});

//Set body to JSON when content-type is json:
app.use(express.json());


/*
* Routes:
*/

//default route
app.get('/', (req, res) => {
    res.send({
        id: 42,
        name: 'Life Answerr'
    });
});

//messages:
app.get('/messages', messagesController.getMessages);
app.post('/messages', messagesController.postMessage);

//friends:
app.get('/friends', friendsController.getFriends);
app.get('/friend/:id', friendsController.getFriendById);
app.post('/friend', friendsController.postFriend);


//Listener:
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}...`);
});
