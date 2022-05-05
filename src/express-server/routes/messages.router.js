const express = require('express');

const messagesController = require('../controllers/messages.controller');


const messagesRouter = express.Router();


//Relative path
messagesRouter.get('/', messagesController.getMessages);
messagesRouter.post('/', messagesController.postMessage);


module.exports = messagesRouter;