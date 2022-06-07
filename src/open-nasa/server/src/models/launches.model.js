const launches = new Map();

let latestFlightNumber = 42;

const launch = {
    flightNumber: 42, //defined by server/db
    mission: 'Kepler Explorer Y',  //defined by client
    rocket: 'Rocket Tea',   //defined by client
    launchDate: new Date('October 14, 2042'), //defined by client
    destination: 'Kepler-442 b', //defined by client
    customer: ['NODE','NASA'], //defined by server
    upcoming: true, //defined by server
    success: true //defined by server
}

launches.set(launch.flightNumber, launch);
//launches.get(42) === launch


function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch, test) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customer: ['RAF', 'NASA'],
            flightNumber: latestFlightNumber,
        })
    );
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
}
