const http = require('http');

const PORT = 3000;

/*const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({
        id: 1,
        message: 'Response message here!'
    }));
});*/

//Event Emitter
const server = http.createServer();


const friends = [
    {
      id: 0,
      name: 'Raf',
    },
    {
      id: 1,
      name: 'Gaia',
    },
    {
      id: 2,
      name: 'Joe',
    }
  ];

server.on('request', (req, res) => {
    const items = req.url.split('/');
    // /friends/2 => ['', 'friends', '2']
    // /friends/
    if (req.method === 'POST' && items[1] === 'friends') {
        req.on('data', (data) => {
        const friend = data.toString();
        console.log('Request:', friend);
        friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    } else if (req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (items.length === 3) {
        const friendIndex = Number(items[2]);
        res.end(JSON.stringify(friends[friendIndex]));
        } else {
        res.end(JSON.stringify(friends));
        }
    } else if (req.url === '/messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello there</li>');
        res.write('</ul>');
        res.write('</body></html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});