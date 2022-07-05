/*
*   NaSchool

*   createdAt: Mon,Jul4,2022,GMT-3,planetTerra
*   updatedAt: 7:51pm Mon,Jul4,2022,GMT-3,planetTerra
*/

/*
    Why receive an object in constructor?
    1. pass what we need without passing undefined or null
    2. pass just an object without destructuring
    3. pass properties in any order
*/
module.exports.User = class User {
    constructor({
        id,
        name = null,
        lastName = null,
        gender = genders.NOT_SPECIFIED,
        meta = {}
    }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.gender = gender;
        this.meta = meta;
    }
}

const genders = {
    NOT_SPECIFIED: 0,
    MALE: 1,
    FEMALE: 2
}

module.exports.userConstants = {
    genders
}