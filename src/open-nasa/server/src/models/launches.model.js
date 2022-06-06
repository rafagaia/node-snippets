const launches = new Map();

const launch = {
    flightNumber: 42,
    mission: 'Kepler Explorer Y',
    rocket: 'Rocket Tea',
    launchDate: new Date('October 14, 2042'),
    destination: 'Kepler-442 b',
    customer: ['NODE','NASA'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);
//launches.get(42) === launch


module.exports = {
    launches,
}
