/*
pass to WebAPI and let EventLoop monitor Callback Queue (CQ)
containing task returned from WebAPI, to be popped from
CQ into Call Stack
*/
setTimeout(() => {
    console.log('1', 'is the first positive integer');
}, 0);

setTimeout(() => {
    console.log('2', 'comes right after 1, with Real number infity in between');
}, 10);

//3
console.log('3', 'is for trinity');

//4
Promise
.resolve('resolved promised deliveries')
    .then((data) =>
        console.log('4', data)
    );

//5
console.log('5', 'for pentagon');