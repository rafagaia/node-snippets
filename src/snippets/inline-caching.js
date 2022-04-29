//inline caching
function findUser(user) {
    return `found ${user.firstName} ${user.lastName}`
}

const userData  = {
    firstName: 'rafa',
    lastName: 'gaia'
}

/*
*   If findUser is called multiple times, JIT compiler will optimize such that userData
*       is Read only once
*/
console.log(findUser(userData));
findUser(userData);
findUser(userData);
findUser(userData);

