const request = require('supertest');
const app = require('../../api');

describe('Test GET /launches', () => {
    test('It should respond with status 200 success.', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        // expect(response.statusCode).toBe(200); can use this jest way, or chain functions with supertest, as above
    });
});

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'USS Liberty',
        rocket: 'NSS 4232',
        target: 'Mars Loc 33',
        launchDate: 'September 7, 2022'
    };

    const launchDataWithoutDate = {
        mission: 'USS Liberty',
        rocket: 'NSS 4232',
        target: 'Mars Loc 33',
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Liberty',
        rocket: 'NSS 4232',
        target: 'Mars Loc 33',
        launchDate: 'Septem'
    };

    test('It should respond with status 201 created.', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(requestDate).toBe(responseDate);

        //whenever we test response body, we use jest assertions:
        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch properties'
        });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid Launch Data'
        });
    });
});