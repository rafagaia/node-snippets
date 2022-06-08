//built-ins should come above third-party libs
const fs = require('fs');
const path = require('path');
//third party libs
const { parse } = require('csv-parse');


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

const habitablePlanets = [];


function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        //Event
        const readStream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'));

        //Observer
        readStream.pipe(parse({
            comment: '#',
            columns: true, //return each row in CSV file as javascript object with key value pairs instead of array of values.
        }))
        .on('data', (data) => {
            if (isHabitablePlanet(data)) habitablePlanets.push(data);
        })
        .on('error', (err) => {
            console.error(err);
            reject(err);
        })
        .on('end', () => {
            /* Don't need to log list of planet names... will read from API
                -not returning anything... only populating habitablePlanets
            console.log(habitablePlanets.map((planet) => {
                return planet['kepler_name'];
            }));
            */
            console.log(`${habitablePlanets.length} habitable planets found.\n`);
            resolve();
        });
    });
}
    //func1------

function getAllPlanets() {
    return habitablePlanets;
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


















