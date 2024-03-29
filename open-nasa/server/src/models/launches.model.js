const axios = require('axios');

const launchesDB = require('./launches.mongo');
const planetsDB = require('./planets.mongo');

// const launches = new Map();

const DEFAULT_FLIGHT_NUMBER = 42;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';


async function populateLaunches() {
    console.log("Downloading launch data from SpaceXAPI...");
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
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

    if (response.status !== 200) {
        console.log('...Problem downloading launch data.');
        throw new Error('Launch data download failed.');
    }

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
        console.log(`${launch.flightNumber} ${launch.mission} ${launch.launchDate}`);
        await saveLaunch(launch);
    }
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if (firstLaunch) {
        console.log('Launch data already loaded!!!');
    } else {
        await populateLaunches();
    }
}

async function findLaunch(filter) {
    return await launchesDB.findOne(filter);
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

async function getAllLaunches(skip, limit) {
    return await launchesDB
        .find({}, { '_id': 0, '__v': 0 })
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit);
}

async function saveLaunch(launch) {
    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber //how we're finding if this launch already exists in DB
    }, launch, {
        upsert: true
    });
}

async function scheduleNewLaunch(launch) {
    //since we can't associate Documents (as with SQL FK)
    const planet = await planetsDB.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No Matching Planet was found.');
    }

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
    return await findLaunch({
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