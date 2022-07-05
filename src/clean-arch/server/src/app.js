const express = require('express');

const app = express();

const PORT = process.env.PORT || 8181;


module.exports = {
    start: () => {
        app.listen(PORT, () => {
            console.log(`Server listening on Port ${PORT}...`);
        })
    }
}