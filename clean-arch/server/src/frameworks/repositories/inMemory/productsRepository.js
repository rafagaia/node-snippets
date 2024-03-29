const {
    inMemory: inMemoryDb
} = require('../../database');

const {
    v4: uuidv4
} = require('uuid');

module.exports = {
    getById: async id => {
        return inMemoryDb.products.find(element => element.id === id);
    },
    update: async product => {
        const index = inMemoryDb.products.findIndex(element => element.id === product.id);
        if (index >= 0) {
            inMemoryDb.products[index] = product;
            return inMemoryDb.products[index];
        }
        return null;
    },
    delete: async product => {
        const index = inMemoryDb.products.findIndex(element => element.id === product.id);
        if (index >= 0) {
            inMemoryDb.products.splice(index, 1);
            return product;
        }
        return null;
    },
    add: async product => {
        if (!product.id) users.id = uuidv4();
        inMemoryDb.products.push(product);
        return product;
    }
}