//built-ins should come above third-party libs
const fs = require('fs');
const path = require('path');
//third party libs
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

/*
    const promise = new Promise((resolve, reject) => {
        resolve(42);
    });
    promise.then((result) => {

    });
    const result = await promise; //locks code
    console.log(result);
*/


function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        //Event
        const readStream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'));

        //Observer
        readStream.pipe(parse({
            comment: '#',
            columns: true, //return each row in CSV file as javascript object with key value pairs instead of array of values.
        }))
        .on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                savePlanet(data);
            }
        })
        .on('error', (err) => {
            console.error(err);
            reject(err);
        })
        .on('end', async () => {
            const planetsFound = await getAllPlanets();
            console.log(`${planetsFound.length} habitable planets found.\n`);
            resolve();
        });
    });
}
    //func1------

async function getAllPlanets() {
    return await planets
        .find({}, { '__v': 0, '_id': 0 });
}

async function savePlanet(planet) {
    //insert + update = upsert  ... only inserts when object doesnt already exist
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true
        });
    } catch (err) {
        console.error(`Could not save Planet: ${err}`);
    }
}

 module.exports = {
    loadPlanetsData,
    getAllPlanets,
}

/* ---------------------------------------------
Snippet from CSV Parse - Stream API website:
// const assert = require('assert');
//initialize the parser... returns an EventEmitter that deals with streams of data
const parser = parse({
    delimiter: ':'
});

//Observer onto readable stream API to consume records:
parser.on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
        records.push(record);
    }
});

//Observer to catch emitted errors:
parser.on('error', (err) => {
    console.error(`Error: ${err}\n`);
});

//Observer Test: test that the passed records matched expected
//

//Write data to the stream



//Close the readable stream
parser.end();

*/


















