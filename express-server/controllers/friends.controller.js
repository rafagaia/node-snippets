const model = require('../models/friends.model');

function getFriends(req, res) {
    res.json(model);
}

//GET /friends/21
function getFriendById(req, res) {
    const friendId = Number(req.params.id); //or +req.params.id;
    const friend = model[friendId];
    if (friend) {
        res.status(200).json(friend);
    } else {
        res.status(404).json({
            error: "Friend does not exist"
        });
    }
}

function postFriend(req, res) {
    if (!req.body.name)  {
        return res.status(400).json({
            error: 'Missing friend name'
        });
    }

    const newFriend = {
        id: model.length,
        name: req.body.name
    };

    model.push(newFriend);
    res.status(201).json(newFriend);
}


module.exports = {
    getFriends,
    getFriendById,
    postFriend
}