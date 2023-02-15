/*
*   Entry point file to entities module... kinda like a facade-pattern
*/
const { 
    User,
    userConstants
} = require('./User');


const { Product } = require('./Product');


//@TODO: Facade Interface
module.exports = {
    User,
    Product,
    constants: {
        userConstants
    }
}

