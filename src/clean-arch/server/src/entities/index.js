/*
*   Entry point file to entities module... kinda like a facade-pattern
*/
const { 
    User,
    userConstants
} = require('./User');

module.exports = {
    User,
    constants: {
        userConstants
    }
}

