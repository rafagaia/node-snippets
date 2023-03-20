const EventEmitter = require('events');


const celebrity = new EventEmitter;

//Subscribe to celebrity for Observer 1:
celebrity.on('race', (result) => {
    if (result == "win") console.log('Observer 1: yay, congrats for the win');
});

//Subscribe to celebrity for Observer 2:
celebrity.on('race', (result) => {
    if (result == "lost") console.log('Observer 2: You suck');
});

//observer 3:
celebrity.on('race', (result) => {
    if (result == "lost") console.log('Observer3: you lost\n');
});

//observer 4:
celebrity.on('race', (result) => {
    console.log('Observer4: win or loose, never give up');
});


process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
});

process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
});

console.log("\nEmit event race/Win:\n");
celebrity.emit('race', 'win');
console.log("\nEmit event race/lost:\n");
celebrity.emit('race', 'lost');
