/*
*   Entry point to repositories/inMemory
*/
const usersRepository = require('./usersRepository');
const productsRepository = require('./productsRepository');

module.exports = {
    usersRepository,
    productsRepository
}