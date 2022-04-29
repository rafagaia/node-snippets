
//Callback pyramid of nasty
movePlayer(100, 'Left', function() {
    movePlayer(400, 'Left', function () {
        movePlayer(10, 'Right', function() {
            movePlayer(420, 'Left', function() {
                console.log('Player 420 moved In')
            });
        });
    });
});

//Moving Player with Promises:
movePlayer(100, 'Left')
    .then(() => movePlayer(400, 'Left'))
    .then(() => movePlayer(10, 'Up'))
    .then(() => movePlayer(420, 'In'))