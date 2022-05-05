const express = require('express');

const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');


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
    console.log(`${req.method}  ${req.baseUrl}${req.url}  ${delta}ms`);
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

//Mount messagesRouter on app object:
app.use('/messages', messagesRouter);
//Mount friendsRouter on app object:
app.use('/friends', friendsRouter);




//Listener:
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}...`);
});
