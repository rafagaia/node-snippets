const { parse } = require('csv-parse');
const fs = require('fs');
// const assert = require('assert');


function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}


const habitablePlanets = [];

//Event
const readStream = fs.createReadStream('./data/kepler_data.csv');

//Observer
readStream
    .pipe(parse({
        comment: '#',
        columns: true, //return each row in CSV file as javascript object with key value pairs instead of array of values.
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) habitablePlanets.push(data);
    })
    .on('error', (err) => {
        console.error(err);
    })
    .on('end', () => {
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }));
    });


















/* ---------------------------------------------
Snippet from CSV Parse - Stream API website:

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


















