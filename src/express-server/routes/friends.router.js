const express = require('express');

const friendsController = require('../controllers/friends.controller');


const friendsRouter = express.Router();

//Custom middleware just for this Route:
friendsRouter.use((req, res, next) => {
    console.log('ip address: ', req.ip);
    next();
});

friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:id', friendsController.getFriendById);

module.exports = friendsRouter;