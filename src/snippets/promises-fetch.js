
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums'
]


async function fetchUsers() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await resp.json();
    console.log(data);
}


//use this, or async/await ... personal preferences
Promise.all(urls.map(url => {
    return fetch(url).then(response => response.json())
})).then(results => {
        console.log(results[0])
        console.log(results[1])
        console.log(results[2])
}).catch('error')
    .finally(() => { console.log('extra') })

//another way: function expression
const getData = async function() {
    try {
        //destructuring
        const [users, posts, albums] = await Promise.all(urls.map(url => {
            return fetch(url).then(response => response.json())
        }));
        console.log(users)
        console.log(posts)
        console.log(albums)
    } catch (error) {
        console.log(error);
    }
}