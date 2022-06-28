const express = require('express');


const app = express();


function delay(msDuration) {
    const startTime = Date.now() //current time in ms
    while ((Date.now() - startTime) < msDuration) {
        //event loop is blocked
    }
}


app.get('/', (req, res) => {
    //example blocking functions:
    //JSON.stringify({}) => "{}"
    //JSON.parse("{}") => {}
    // Array.sort()
    res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
    //delay the response
    delay(7000);
    res.send(`Bling bling bling ${process.pid}`);
}); 



app.listen(3000, () => {
    console.log(`Worker Server is listening on PORT: 3000...`);
});