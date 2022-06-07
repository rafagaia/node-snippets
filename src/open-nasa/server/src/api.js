const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const api = express();


api.use(cors({
    origin: 'http://localhost:3000',
}));
api.use(morgan('combined'));

api.use(express.json());
//Serve Client (React) Static build (from server/public)
api.use(express.static(path.join(__dirname, '..', 'public')));

api.use('/planets', planetsRouter);
api.use('/launches', launchesRouter);
api.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = api;