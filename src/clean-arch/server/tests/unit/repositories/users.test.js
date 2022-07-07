/*
*   @startedAt: Jun30,2022
*
*   @createdAt: "Wed Jul5,15:40pm,2022,gmt-3"
*   @author: ['rgaia','']
*   @references: ['UdemyInstructor:MichaelKibenko']
*/
const { usersRepository } = require('../../../src/frameworks/repositories/inMemory');

const {
    User,
    constants: {
        userConstants: {
            genders
        }
    }
} = require('../../../src/entities');

const chance = require('chance');


describe('Users repository', () => {
    test('New user should be added and returned', async () => {
        const testUser = new User({
            name: chance.name(),
            lastName: chance.last(),
            gender: genders.MALE,
            meta: {
                hair: {
                    color: 'black'
                }
            }
        });

        
    });


    test('New user should be updated and returned', async () => {});


    test('New user should be deleted and returned', async () => {});


    test('New user should be fetched by id and returned', async () => {});
});