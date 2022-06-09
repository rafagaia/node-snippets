const launchesDB = require('./launches.mongo');
const planetsDB = require('./planets.mongo');

const launches = new Map();

let latestFlightNumber = 42;

const launch = {
    flightNumber: 42, //defined by server/db
    mission: 'Kepler Explorer Y',  //defined by client
    rocket: 'Rocket Tea',   //defined by client
    launchDate: new Date('October 14, 2042'), //defined by client
    target: 'Kepler-442 b', //defined by client
    customers: ['NODE','NASA'], //defined by server
    upcoming: true, //defined by server
    success: true //defined by server
}
// when we were  using map: launches.set(launch.flightNumber, launch);
//launches.get(42) === launch
// function getAllLaunches() {
//     return Array.from(launches.values());
// }

saveLaunch(launch);

async function getAllLaunches() {
    return await launchesDB
        .find({}, { '_id': 0, '__v': 0 });
}

async function saveLaunch(launch) {
    const planet = await planetsDB.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No Matching Planet was found.');
    }

    await launchesDB.updateOne({
        flightNumber: launch.flightNumber //how we're finding if this launch already exists in DB
    }, launch, {
        upsert: true
    });
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['RAF', 'NASA'],
            flightNumber: latestFlightNumber,
        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}
