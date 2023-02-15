const launchesDB = require('./launches.mongo');
const planetsDB = require('./planets.mongo');

const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 42;

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

//saveLaunch(launch);

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDB
        .findOne()
        .sort('-flightNumber'); //by default, sorts from lowest to highest. the '-' reverses that option.
    
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
    return await launchesDB
        .find({}, { '_id': 0, '__v': 0 });
}

async function saveLaunch(launch) {
    //since we can't associate Documents (as with SQL FK)
    const planet = await planetsDB.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No Matching Planet was found.');
    }

    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber //how we're finding if this launch already exists in DB
    }, launch, {
        upsert: true
    });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        success: true,
        upcoming: true,
        customers: ['RAF', 'NASA'],
    });

    await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
    return await launchesDB.findOne({
        flightNumber: launchId
    });
}

async function abortLaunchById(launchId) {
    const aborted = await launchesDB.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });

    return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
    existsLaunchWithId
}


/* Uses Map instead of Mongo
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
*/