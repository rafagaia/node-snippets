const promise = new Promise((resolve, reject) => {
    if (resolve) {
        resolve('stuff works');
    } else {
        reject('Error, it broke')
    }
})

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'promise2')
})

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 'promise3')
})

const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'promise4')
})

Promise.all([promise, promise2, promise3, promise4])
    .then(values => {
        console.log(values)
    })

// promise
//     .then(result => {
//         return result + '!!!'
//     })
//     .then(result2 => {
//         console.log(result2);
//         throw Error;
//     })
//     .catch(() => console.log('*error*'));
