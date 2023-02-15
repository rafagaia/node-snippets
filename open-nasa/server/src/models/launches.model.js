const axios = require('axios');

const launchesDB = require('./launches.mongo');
const planetsDB = require('./planets.mongo');

// const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 42;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';


// const launch = {
//     flightNumber: 42, //defined by server/db
//     mission: 'Kepler Explorer Y',  //defined by client
//     rocket: 'Rocket Tea',   //defined by client
//     launchDate: new Date('October 14, 2042'), //defined by client
//     target: 'Kepler-442 b', //defined by client
//     customers: ['NODE','NASA'], //defined by server
//     upcoming: true, //defined by server
//     success: true //defined by server
// }
// when we were  using map: launches.set(launch.flightNumber, launch);
//launches.get(42) === launch
// function getAllLaunches() {
//     return Array.from(launches.values());
// }

//saveLaunch(launch);

async function loadLaunchData() {
    console.log("Downloading launch data from SpaceXAPI...");
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        console.log(`${launch.flightNumber} ${launch.mission}`)
    }
}


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
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};


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