const express = require('express');

const farmsController = require('src/controllers/farms.controller');

const farmsRouter = express.Router();

//Custome farms middleware go here
// Template for farmsMiddleware:
farmsRouter.use((req, res, next) => {
    console.log('(MIDDLEWARE) [farmsController] default');
    next(); //important
});

farmsRouter.get('/', farmsController.getFarms);
farmsRouter.get('/fruit/:fruitName', farmsController.getFarmsByFruitname);

module.exports = farmsRouter;
