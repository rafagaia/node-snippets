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

const Chance = require('chance');

const chance = new Chance();

const { cloneDeep } = require('lodash');


describe('Users repository', () => {
    const testUser1 = {
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.MALE,
        meta: {
            hair: {
                color: 'black',
            },
            clothes: {
                head: {
                    hat: 'cowboy',
                    glasses: 'prescription classic Ray Ban style CB',
                    mask: 'AirFilter3k by CB'
                },
                body: {
                    underwear: 'NIKE',
                    shorts: 'NIKE Vintage',
                    socks: 'custom',
                    tee: 'custom cafe'
                }
            }
        }
    };

    const testUser2 = {
        name: chance.name(),
        lastName: chance.last(),
        gender: genders.MALE,
        meta: {
            hair: {
                color: 'green',
            },
        }
    };

    test('New user should be added and returned', async () => {
        const testUser = new User(testUser1);

        const addedUser = await usersRepository.add(testUser);
        expect(addedUser).toBeDefined();
        expect(addedUser.id).toBeDefined();
        expect(addedUser.name).toBe(testUser.name);
        expect(addedUser.lastName).toBe(testUser.lastName);
        expect(addedUser.gender).toBe(testUser.gender);
        expect(addedUser.meta).toEqual(testUser.meta);

        const returnedUser = await usersRepository.getById(addedUser.id);
        expect(returnedUser).toEqual(addedUser);
    });


    test('New user should be updated and returned', async () => {
        const testUser = new User(testUser2);

        const addedUser = await usersRepository.add(testUser);
        expect(addedUser).toBeDefined();

        const clonedUser = cloneDeep({
            ...addedUser,
            name: chance.name(),
            gender: addedUser.gender === genders.MALE ? genders.NOT_SPECIFIED : genders.FEMALE
        });

        const updatedUser = await usersRepository.update(clonedUser);
        
        expect(updatedUser).toEqual(clonedUser);
    });


    test('New user should be deleted and returned', async () => {
        const [willBeDeletedAddedUser, shouldStayAddedUser] = await Promise.all([usersRepository.add(testUser1), usersRepository.add(testUser2)]);
        expect(willBeDeletedAddedUser).toBeDefined();
        expect(shouldStayAddedUser).toBeDefined();
        //delete one:
        const deletedUser = await usersRepository.delete(willBeDeletedAddedUser);
        expect(deletedUser).toEqual(willBeDeletedAddedUser);

        // try to get the deleted user ( undefined )
        const shouldBeUndefinedUser = await usersRepository.getById(deletedUser.id);
        expect(shouldBeUndefinedUser).toBeUndefined();

        const shouldBeDefinedUser = await usersRepository.getById(shouldStayAddedUser.id);
        expect(shouldBeDefinedUser).toBeDefined();
    });

    //@TODO
    // test('New user should be fetched by id and returned', async () => {

    // });
});