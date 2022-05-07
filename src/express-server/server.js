const express = require('express');
const path = require('path');

const messagesRouter = require('./routes/messages.router');
const friendsRouter = require('./routes/friends.router');


const app = express();

//Load handlebars templating engine internally
app.set('view engine', 'hbs');
//find our templates in project folder:
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

/*
* Application-wide Middleware:
* - Gets applied to All incoming Requests,
*   - then to specific mounted Express Routers
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

//Not RESTful:
// Better to use a CDN to serve static files
//Mount static files under /site path
app.use('/site', express.static(path.join(__dirname, 'public')));

//Set body to JSON when content-type is json:
//If at some point we have a mounted Router that does not use JSON,
// remove from server.js, and pass app.use(express.json()) inside each routers on per-need basis
//      This should be a JSON-only API, so if above becomes True, make it False by implementing such
//       non-JSON route to another API on its own Process.
app.use(express.json());

/*
* Routes:
*/
//default route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Clever handlebars',
        caption: 'What a Caption, go Skiing'
    });
});

//Mount messagesRouter on app object:
app.use('/messages', messagesRouter);
//Mount friendsRouter on app object:
app.use('/friends', friendsRouter);



/*
* Listener:
*/
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}...`);
});
